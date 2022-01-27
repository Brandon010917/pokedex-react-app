import { useEffect, useState } from "react";

//axios
import axios from "axios";

//React-router-dom
import { Link } from "react-router-dom";

const PokemonsList = ({ url }) => {
  //State
  const [pokemonInfo, setPokemonInfo] = useState(null);

  //Effect
  useEffect(() => {
    axios.get(url).then(({ data }) => setPokemonInfo(data));
  }, [url]);

  const renderId =
    pokemonInfo?.id >= 10 && pokemonInfo?.id < 100
      ? `#0${pokemonInfo?.id}`
      : pokemonInfo?.id >= 100
      ? `#${pokemonInfo?.id}`
      : `#00${pokemonInfo?.id}`;

  return (
    <>
      {pokemonInfo && (
        <Link
          to={pokemonInfo.name}
          className={`p-3 rounded-lg grid grid-cols-2 ${pokemonInfo.types[0].type.name} shadow-2xl cursor-pointer text-white`}
        >
          <div className="col-span-full flex items-center justify-between mb-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {pokemonInfo.name}
            </h1>
            <p className="font-bold text-sm">{renderId}</p>
          </div>

          <div>
            {pokemonInfo.types.map(({ type }) => (
              <button
                key={type.name}
                className={`block text-sm sm:text-base rounded font-semibold px-3 py-1.5 h-9 mb-1 ${pokemonInfo.types[0].type.name}-80`}
              >
                {type.name}
              </button>
            ))}
          </div>

          <div className="pokemon-image">
            <img
              src={pokemonInfo.sprites.other["official-artwork"].front_default}
              alt="Pokeball"
            />
          </div>
        </Link>
      )}
    </>
  );
};

export default PokemonsList;
