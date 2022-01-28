import { actions } from "../types";

const INITIAL_STATE = {
  userName: "",
  pokemons: [],
  pokemonsTypes: [],
  pokemonsFiltered: [],
  isLoading: false,
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
    case actions.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
