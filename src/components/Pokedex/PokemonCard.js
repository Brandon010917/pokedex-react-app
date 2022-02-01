import { useEffect, useState } from "react";

//axios
import axios from "axios";

//React-router-dom
import { Link } from "react-router-dom";
import PokemonTypeBtn from "./PokemonTypeBtn";

const PokemonsList = ({ url }) => {
  //State
  const [pokemonInfo, setPokemonInfo] = useState(null);

  //Effect
  useEffect(() => {
    axios.get(url).then(({ data }) => setPokemonInfo(data));
  }, [url]);

  const renderId =
    pokemonInfo?.id <= 9
      ? `#00${pokemonInfo?.id}`
      : pokemonInfo?.id >= 10 && pokemonInfo?.id < 100
      ? `#0${pokemonInfo?.id}`
      : `#${pokemonInfo?.id}`;

  return (
    <>
      {pokemonInfo && (
        <Link
          to={pokemonInfo.name}
          className={`${pokemonInfo.types[0].type.name} text-white grid grid-cols-2 p-3 rounded-lg shadow-2xl md:cursor-pointer md:hover:scale-110 md:transition-transform md:duration-500`}
        >
          <div className="col-span-full flex justify-between items-center mb-3">
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
              {pokemonInfo.name}
            </h1>
            <p className="font-bold text-sm">{renderId}</p>
          </div>

          <div>
            {pokemonInfo.types.map(({ type }) => (
              <PokemonTypeBtn
                key={type.name}
                bgColor={pokemonInfo.types[0].type.name}
                name={type.name}
              />
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
