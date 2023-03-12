import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./Reducers/userReducers";
import {
  pokemonCreateReducer,
  pokemonReducer,
  pokemonUpdateReducer,
} from "./Reducers/pokemonReducer";
const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userupdate: userUpdateReducer,
  pokemonList: pokemonReducer,
  pokemonCreate: pokemonCreateReducer,
  pokemonUpdate: pokemonUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const pokemonListFromStorage = localStorage.getItem("pokemonList")
  ? JSON.parse(localStorage.getItem("pokemonList"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  pokemonList: { pokemonList: pokemonListFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
