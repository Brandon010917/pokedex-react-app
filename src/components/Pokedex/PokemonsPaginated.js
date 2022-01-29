import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Actions
import { setIndexPokemons, setPage } from "../../redux/actions";

const PokemonsPaginated = ({ pokemonsList }) => {
  //Redux-hooks
  const page = useSelector((state) => state.page);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
  const dispatch = useDispatch();

  let lastIndexPokemons = page * pokemonsPerPage;
  let firstIndexPokemons = lastIndexPokemons - pokemonsPerPage;

  //Effect
  useEffect(() => {
    dispatch(setIndexPokemons({ firstIndexPokemons, lastIndexPokemons }));
  }, [dispatch, firstIndexPokemons, lastIndexPokemons]);

  //Paginated
  let totalPages = Math.ceil(pokemonsList?.length / pokemonsPerPage);

  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="bg-gray-800 p-4 overflow-x-visible flex gap-4 mt-10">
      {pages.map((numPage) => (
        <button
          key={numPage}
          className="bg-gray-100 px-3 py-1.5"
          onClick={() => dispatch(setPage(numPage))}
        >
          {numPage}
        </button>
      ))}
    </div>
  );
};

export default PokemonsPaginated;
