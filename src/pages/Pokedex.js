import { useEffect, useState } from "react";

//Logo
import pokeball from "../assets/images/pokeball-black.svg";

//Axios
import axios from "axios";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Actions
import { getPokemonsThunk, resetPokemonsFiltered } from "../redux/actions";

//Components
import PokemonCard from "../components/Pokedex/PokemonCard";
import SearchNav from "../components/Custom/SearchNav";
import PokemonsPaginated from "../components/Pokedex/PokemonsPaginated";

const Pokedex = () => {
  //State
  const [pokemonsList, setPokemonsList] = useState([]);

  //Redux-hooks
  const pokemons = useSelector((state) => state.pokemons);
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);
  const page = useSelector((state) => state.page);

  const dispatch = useDispatch();

  //Effect
  useEffect(() => {
    dispatch(getPokemonsThunk());

    return () => {
      dispatch(resetPokemonsFiltered());
    };
  }, [dispatch]);

  useEffect(() => {
    setPokemonsList(pokemons);
  }, [pokemons]);

  useEffect(() => {
    if (pokemonsFiltered.length === 1) {
      axios
        .get(pokemonsFiltered[0].url)
        .then(({ data }) => setPokemonsList(data.pokemon));
    } else {
      setPokemonsList(pokemonsFiltered);
    }
  }, [pokemonsFiltered]);

  //Paginate
  const lastIndexOfPokemons = pokemonsPerPage * page;
  const firstIndexOfPokemons = lastIndexOfPokemons - pokemonsPerPage;

  const totalPages = Math.ceil(pokemonsList.length / pokemonsPerPage);

  const currentPokemons = pokemonsList.slice(
    firstIndexOfPokemons,
    lastIndexOfPokemons
  );

  return (
    <main className="pokedex overflow-x-hidden min-h-screen pb-10">
      {/* Image Pokeball Background */}
      <img src={pokeball} alt="Pokeball" className="pokeball-background z-20" />

      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="relative text-5xl font-bold text-gray-200 z-20">
            Pokédex
          </h1>
        </div>

        {/* Search and Filter Pokemon */}
        <SearchNav />

        {/* Render Pokemons */}
        <section className="pokemon-container relative grid justify-center items-start gap-4 z-30">
          {currentPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.url || pokemon.pokemon.url}
              url={pokemon.url || pokemon.pokemon.url}
            />
          ))}
        </section>

        {/* Paginated */}
        <PokemonsPaginated page={page} totalPages={totalPages} />
      </div>
    </main>
  );
};

export default Pokedex;
