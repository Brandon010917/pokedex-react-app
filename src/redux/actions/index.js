import axios from "axios";
import { actions } from "../types";

export const setUserName = (name) => ({
  type: actions.setUserName,
  payload: name,
});

export const setPokemons = (pokemons) => ({
  type: actions.setPokemons,
  payload: pokemons,
});

export const setPokemonsTypes = (types) => ({
  type: actions.setPokemonsTypes,
  payload: types,
});

export const filterByTypePokemons = (type) => ({
  type: actions.filterByTypePokemons,
  payload: type,
});

// Thunks
export const getPokemonsThunk = () => {
  return (dispatch) => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=898&offset=0")
      .then(({ data }) => dispatch(setPokemons(data.results)));

    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => dispatch(setPokemonsTypes(data.results)));
  };
};

/* export const getPokemonsThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=898&offset=0"
    );
    return dispatch(setPokemons(data.results));
  };
}; */

/* export const getPokemonsTypesThunk = () => {
  return async (dispatch) => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type");
    return dispatch(setPokemonsTypes(data.results));
  };
};
 */
