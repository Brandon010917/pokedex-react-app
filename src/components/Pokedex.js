//Logo
import pokeball from "../assets/images/pokeball-black.svg";

//Redux
import { useSelector } from "react-redux";

//Components
import PokemonCard from "./PokemonCard";
import SearchNav from "./SearchNav";
import { useEffect, useState } from "react";
import axios from "axios";

const Pokedex = () => {
  //State
  const [pokemonsList, setPokemonsList] = useState([]);
  const [page, setPage] = useState(1);

  //Redux-hooks
  const pokemons = useSelector((state) => state.pokemons);
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);

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

  //Paginated
  let pokemonsPerPage = 16;
  let totalPages = Math.ceil(pokemonsList?.length / pokemonsPerPage);

  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  let lastIndexPokemons = page * pokemonsPerPage;
  let firstIndexPokemons = lastIndexPokemons - pokemonsPerPage;

  const paginatedPokemons = pokemonsList?.slice(
    firstIndexPokemons,
    lastIndexPokemons
  );

  return (
    <main className="bg-gray-200 overflow-x-hidden min-h-screen">
      {/* Image Pokeball Background */}
      <img src={pokeball} alt="Pokeball" className="pokeball-background z-20" />

      <div className="container mx-auto p-4 pokedex z-30 relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <img src={pokeball} alt="Pokeball" className="w-7 h-7" />
          <h1 className="text-5xl font-bold">Pokédex</h1>
        </div>

        {/* Search and Filter Pokemon */}
        <SearchNav />

        {/* Render Pokemons */}
        <section className="pokemon-container gap-3">
          {paginatedPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
              url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Pokedex;
