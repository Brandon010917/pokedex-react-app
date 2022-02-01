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

export const setPokemonInfo = (pokemon) => ({
  type: actions.setPokemonInfo,
  payload: pokemon,
});

export const setPokemonNameJP = (nameJP) => ({
  type: actions.setPokemonNameJP,
  payload: nameJP,
});

export const setPokemonLocation = (location) => ({
  type: actions.setPokemonLocation,
  payload: location,
});

export const setIsLoading = (isLoading) => ({
  type: actions.setIsLoading,
  payload: isLoading,
});

export const resetPokemonsFiltered = () => ({
  type: actions.resetPokemonsFiltered,
});

export const setPage = (page) => ({
  type: actions.setPage,
  payload: page,
});

export const resetPage = () => ({
  type: actions.resetPage,
});

// Thunks
export const getPokemonsThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=898&offset=0")
      .then(({ data }) => dispatch(setPokemons(data.results)));

    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => dispatch(setPokemonsTypes(data.results)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getPokemonInfoThunk = (nameOrId) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setPokemonInfo(null));
    const url = "https://pokeapi.co/api/v2/pokemon/" + nameOrId;
    axios
      .get(url)
      .then(({ data }) => dispatch(setPokemonInfo(data)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getPokemonNameJPThunk = (nameOrId) => {
  return (dispatch) => {
    dispatch(setPokemonNameJP(""));
    const url = "https://pokeapi.co/api/v2/pokemon-species/" + nameOrId;
    axios
      .get(url)
      .then(({ data }) => dispatch(setPokemonNameJP(data.names[0].name)));
  };
};

export const getPokemonLocationThunk = (nameOrId) => {
  return (dispatch) => {
    dispatch(setPokemonLocation(""));
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId}/encounters`;
    axios
      .get(url)
      .then(({ data }) =>
        dispatch(setPokemonLocation(data[0]?.location_area.name))
      );
  };
};
