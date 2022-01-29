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
import Loader from "../components/Custom/Loader";

const Pokedex = () => {
  //State
  const [pokemonsList, setPokemonsList] = useState([]);

  //Redux-hooks
  const pokemons = useSelector((state) => state.pokemons);
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const isLoading = useSelector((state) => state.isLoading);
  const firstIndexPokemons = useSelector((state) => state.firstIndexPokemons);
  const lastIndexPokemons = useSelector((state) => state.lastIndexPokemons);

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

  const paginatedPokemons = pokemonsList?.slice(
    firstIndexPokemons,
    lastIndexPokemons
  );

  return (
    <main className="pokedex overflow-x-hidden min-h-screen pb-10">
      {/* Image Pokeball Background */}
      <img src={pokeball} alt="Pokeball" className="pokeball-background z-20" />

      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-300">Pokédex</h1>
        </div>

        {/* Search and Filter Pokemon */}
        <SearchNav />

        {/* Render Pokemons */}
        <section className="pokemon-container relative grid justify-center gap-4 z-30">
          {isLoading ? (
            <Loader />
          ) : (
            paginatedPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.url || pokemon.pokemon.url}
                url={pokemon.url || pokemon.pokemon.url}
              />
            ))
          )}
        </section>

        {/* Paginated */}
        {/* <PokemonsPaginated pokemonsList={pokemonsList} /> */}
      </div>
    </main>
  );
};

export default Pokedex;
