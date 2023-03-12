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
import axios from "axios";

export const listPokemons = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POKEMON_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/pokemondata`, config);
    dispatch({
      type: POKEMON_LIST_SUCCESS,
      payload: data,
    });
    localStorage.setItem("pokemonList", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POKEMON_LIST_FAIL,
      payload: message,
    });
  }
};

export const createPokemonAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POKEMON_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/pokemondata/create",
      { title },
      config
    );
    dispatch({
      type: POKEMON_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POKEMON_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updatePokemonAction =
  (id, title, content) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POKEMON_UPDATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/pokemondata/${id}`,
        { title, content },
        config
      );
      dispatch({
        type: POKEMON_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POKEMON_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deletePokemonAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POKEMON_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/pokemondata/${id}`, config);

    dispatch({
      type: POKEMON_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POKEMON_DELETE_FAIL,
      payload: message,
    });
  }
};
