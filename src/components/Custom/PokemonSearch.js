import { useState } from "react";

//Redux
import { useSelector } from "react-redux";

//React-router-dom
import { useNavigate, useParams } from "react-router-dom";

const PokemonSearch = ({ type, placeholder }) => {
  //State
  const [pokemonNameOrId, setpokemonNameOrId] = useState("");

  //Router-hooks
  const { nameOrId } = useParams();
  const navigate = useNavigate();

  //Redux-hooks
  const pokemons = useSelector((state) => state.pokemons);

  //Functions
  const handlesubmit = (e) => {
    e.preventDefault();

    if (!pokemonNameOrId) return;

    // Validacion para buscar un pokemón por nombre o id
    // El id debe ser mayor que 0 y menor que 899
    // El nombre debe ser exacto al de un pokemon
    if (type === "number") {
      if (Number(pokemonNameOrId) < 1 || Number(pokemonNameOrId) > 898) return;
    } else {
      const pokemonsName = pokemons.map((pokemon) => pokemon.name);
      const validateSearch = pokemonsName.some(
        (pokemonName) => pokemonName === pokemonNameOrId
      );

      if (!validateSearch) return;
    }

    nameOrId
      ? navigate(`../pokedex/${pokemonNameOrId}`)
      : navigate(pokemonNameOrId);

    setpokemonNameOrId("");
  };

  return (
    <form
      onSubmit={handlesubmit}
      className="text-gray-700 flex justify-center gap-4 max-w-xs mx-auto h-12 text-sm"
    >
      <input
        type={type}
        className="bg-gray-100 w-full h-full px-3 py-1.5 rounded "
        placeholder={placeholder}
        value={pokemonNameOrId}
        onChange={({ target }) => setpokemonNameOrId(target.value)}
      />
      <button type="submit" className="bg-gray-100 px-4 py-1.5 h-full rounded ">
        Go!
      </button>
    </form>
  );
};

export default PokemonSearch;
