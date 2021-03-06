import { actions } from "../types";

const INITIAL_STATE = {
  userName: "",
  pokemons: [],
  pokemonsTypes: [],
  pokemonsFiltered: [],
  pokemonInfo: null,
  pokemonNameJP: "",
  pokemonLocation: "",
  isLoading: false,
  page: 1,
  pokemonsPerPage: 16,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.setUserName:
      const name = action.payload;
      return {
        ...state,
        userName: name,
      };

    case actions.setPokemons:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsFiltered: action.payload,
      };

    case actions.setPokemonsTypes:
      return {
        ...state,
        pokemonsTypes: action.payload,
      };

    case actions.filterByTypePokemons:
      if (action.payload === "all") {
        return {
          ...state,
          pokemonsFiltered: state.pokemons,
        };
      }
      return {
        ...state,
        pokemonsFiltered: state.pokemonsTypes.filter(
          (type) => type.name === action.payload
        ),
      };

    case actions.setPokemonInfo:
      return {
        ...state,
        pokemonInfo: action.payload,
      };

    case actions.setPokemonNameJP:
      return {
        ...state,
        pokemonNameJP: action.payload,
      };

    case actions.setPokemonLocation:
      return {
        ...state,
        pokemonLocation: action.payload,
      };

    case actions.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    case actions.resetPokemonsFiltered:
      return {
        ...state,
        pokemonsFiltered: state.pokemons,
      };

    case actions.setPage:
      return {
        ...state,
        page: action.payload,
      };

    case actions.resetPage:
      return {
        ...state,
        page: 1,
      };

    default:
      return state;
  }
};

export default reducer;
