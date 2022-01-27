import { useEffect, useState } from "react";

//Icons
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";

//Axios
import axios from "axios";

//Components
import StatsPokemon from "./StatsPokemon";
import SearchNav from "./SearchNav";

//React-router-dom
import { useNavigate, useParams } from "react-router-dom";

const PokemonInfo = () => {
  //State
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonNameJp, setPokemonNameJp] = useState("");

  //Router-hooks
  const { nameOrId } = useParams();
  const navigate = useNavigate();

  //Effect
  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + nameOrId;
    axios.get(url).then(({ data }) => setPokemonInfo(data));
  }, [nameOrId]);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon-species/" + nameOrId;
    axios.get(url).then(({ data }) => setPokemonNameJp(data.names[0].name));
  }, [nameOrId]);

  //Functions
  const renderId =
    pokemonInfo?.id >= 10
      ? `#0${pokemonInfo?.id}`
      : pokemonInfo?.id >= 100
      ? `#${pokemonInfo?.id}`
      : `#00${pokemonInfo?.id}`;

  const stats = pokemonInfo?.stats?.map((stat) => [
    stat.stat.name,
    stat.base_stat,
  ]);

  const renderStats = () => {
    return stats?.map((stat) => (
      <StatsPokemon key={stat[0]} statName={stat[0]} statBase={stat[1]} />
    ));
  };

  const prevPage = () => navigate(-1);

  return (
    <section
      className={`${pokemonInfo?.types[0]?.type?.name}-80 min-h-screen md:max-h-screen p-8 md:p-3 md:px-7 text-white md:overflow-y-hidden`}
    >
      {pokemonInfo && (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 px-4">
          {/* Boton para regresar*/}
          <div className="col-span-12">
            <button
              onClick={prevPage}
              className="bg-white text-black shadow-lg rounded px-3 py-1.5 h-9 flex items-center opacity-70"
            >
              <ArrowCircleLeftIcon className="ml-auto w-8 h-8 text-dark-gray" />
            </button>
          </div>
          {/* Columna de Información */}
          <div className="col-span-12 md:col-span-3 flex flex-col h-full relative">
            <div className="font-extrabold mt-16">
              <h2 className="text-xl mb-2">{renderId}</h2>
              <h1 className="text-4xl first-letter:uppercase mb-2">
                {pokemonInfo.name}
              </h1>
            </div>
            <div className="mt-10 mb-2 pt-12 ml-16">
              <p>
                Height:
                {" " + pokemonInfo.height / 10}
                <span className="text-base">m</span>
              </p>
              <p>
                Weigth:
                {" " + pokemonInfo.weight / 10}
                <span className="text-sm">kg</span>
              </p>
              <p className="absolute bottom-10 -left-10 -rotate-90">
                Región: <span className="text-sm">Kanto</span>
              </p>
            </div>
          </div>
          {/* Columna de la imagen y el nombre en Japones */}
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center text-center">
            <div className="relative">
              <img
                src={
                  pokemonInfo.sprites.other["official-artwork"].front_default
                }
                alt={pokemonInfo.name}
                className="mt-10 mb-16 ml-10"
              />
              <p className="text-6xl lg:text-7xl font-semibold text-black text-opacity-30">
                {pokemonNameJp}
              </p>
            </div>
            <p></p>
          </div>
          {/* Columna de estadísticas */}
          <div className="col-span-12 md:col-span-4 mt-10">
            <h3 className="mb-8 text-3xl font-bold text-center">Base stats:</h3>
            <ul className="flex flex-wrap gap-3 justify-center">
              {renderStats()}
            </ul>
          </div>
          <div className="hidden col-span-12 md:block mt-10">
            <SearchNav />
          </div>
        </div>
      )}
    </section>
  );
};

export default PokemonInfo;
