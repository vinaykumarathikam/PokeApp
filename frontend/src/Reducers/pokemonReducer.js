import {
  POKEMON_CREATE_FAIL,
  POKEMON_CREATE_REQUEST,
  POKEMON_CREATE_SUCCESS,
  POKEMON_DELETE_FAIL,
  POKEMON_DELETE_REQUEST,
  POKEMON_DELETE_SUCCESS,
  POKEMON_LIST_FAIL,
  POKEMON_LIST_REQUEST,
  POKEMON_LIST_SUCCESS,
  POKEMON_UPDATE_FAIL,
  POKEMON_UPDATE_REQUEST,
  POKEMON_UPDATE_SUCCESS,
} from "../Constants/pokemonConstants";

export const pokemonReducer = (state = { pokemons: [] }, action) => {
  switch (action.type) {
    case POKEMON_LIST_REQUEST:
      return { loading: true };
    case POKEMON_LIST_SUCCESS:
      return { loading: false, pokemons: action.payload };
    case POKEMON_LIST_FAIL:
      return { loading: false, pokemons: action.payload };
    default:
      return state;
  }
};

export const pokemonCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POKEMON_CREATE_REQUEST:
      return { loading: true };
    case POKEMON_CREATE_SUCCESS:
      return { loading: false, success: true };
    case POKEMON_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const pokemonUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POKEMON_UPDATE_REQUEST:
      return { loading: true };
    case POKEMON_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case POKEMON_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const pokemonDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POKEMON_DELETE_REQUEST:
      return { loading: true };
    case POKEMON_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POKEMON_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
