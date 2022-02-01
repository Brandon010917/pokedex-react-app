import { useEffect } from "react";

//Icons & Logo
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import Logo from "../assets/images/pokemon-logo.png";

//Animated
import { Animated } from "react-animated-css";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Actions
import {
  getPokemonInfoThunk,
  getPokemonLocationThunk,
  getPokemonNameJPThunk,
} from "../redux/actions";

//React-router-dom
import { useNavigate, useParams } from "react-router-dom";

//Components
import PokemonStats from "../components/PokemonInfo/PokemonStats";
import SearchNav from "../components/Custom/SearchNav";
import PokemonFeatures from "../components/PokemonInfo/PokemonFeatures";
import PokemonTitle from "../components/PokemonInfo/PokemonTitle";
import PokemonLocation from "../components/PokemonInfo/PokemonLocation";

const PokemonInfo = () => {
  //Redux-hooks
  const pokemonInfo = useSelector((state) => state.pokemonInfo);
  const pokemonNameJP = useSelector((state) => state.pokemonNameJP);
  const pokemonLocation = useSelector((state) => state.pokemonLocation);

  const dispatch = useDispatch();

  //Router-hooks
  const { nameOrId } = useParams();
  const navigate = useNavigate();

  //Effect
  useEffect(() => {
    dispatch(getPokemonInfoThunk(nameOrId));
    dispatch(getPokemonNameJPThunk(nameOrId));
    dispatch(getPokemonLocationThunk(nameOrId));
  }, [dispatch, nameOrId]);

  const renderId =
    pokemonInfo?.id <= 9
      ? `#00${pokemonInfo?.id}`
      : pokemonInfo?.id >= 10 && pokemonInfo?.id < 100
      ? `#0${pokemonInfo?.id}`
      : `#${pokemonInfo?.id}`;

  //Functions
  const stats = pokemonInfo?.stats.map((stat) => [
    stat.stat.name,
    stat.base_stat,
  ]);

  const prevPage = () => navigate("../pokedex");

  return (
    <section
      className={`${pokemonInfo?.types[0]?.type?.name}-80 relative min-h-screen md:max-h-screen p-8 md:p-3 md:px-7 text-white overflow-x-hidden md:overflow-y-hidden`}
    >
      {pokemonInfo && (
        <div className="grid grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto px-4">
          {/* Boton para regresar*/}
          <div className="col-span-full flex justify-between items-center md:mb-6">
            <button onClick={prevPage} className="flex items-center h-9">
              <ArrowCircleLeftIcon className="w-10 h-10 text-ligth-gray" />
            </button>
            <img
              src={Logo}
              alt="Pokemon Logo"
              className="max-w-xs w-40 md:w-full"
            />
          </div>
          {/* Columna de Información */}
          <div className="md:col-span-3 flex flex-col h-full relative">
            <Animated animationIn="slideInLeft" animationInDuration={2000}>
              <PokemonTitle name={pokemonInfo.name} id={renderId} />

              <div className="mt-10 lg:mt-20 mb-2 ml-16 lg:ml-20 pt-12">
                <PokemonFeatures
                  name="Height"
                  feature={pokemonInfo.height}
                  measure="m"
                />
                <PokemonFeatures
                  name="Weigth"
                  feature={pokemonInfo.weight}
                  measure="kg"
                />
              </div>

              <PokemonLocation pokemonLocation={pokemonLocation || ""} />
            </Animated>
          </div>
          {/* Columna de la imagen y el nombre en Japones */}
          <div className="md:col-span-5 flex flex-col items-center lg:items-center text-center lg:text-left relative">
            <div className="">
              <Animated
                animationIn="slideInDown"
                animationInDuration={2000}
                isVisible={true}
              >
                <img
                  src={
                    pokemonInfo.sprites.other["official-artwork"].front_default
                  }
                  alt={pokemonInfo.name}
                  className="max-w-xs lg:max-w-sm md:mt-10 ml-12 lg:m-4"
                />
              </Animated>

              <p className="text-black font-bold text-6xl lg:text-7xl text-opacity-20 lg:absolute lg:top-20 lg:-left-40">
                {pokemonNameJP}
              </p>
            </div>
          </div>
          {/* Columna de estadísticas */}
          <div className="md:col-span-4 mt-10">
            <Animated
              animationIn="slideInRight"
              animationInDuration={2000}
              isVisible={true}
            >
              <h3 className="mb-6 font-bold text-3xl text-center">
                Base stats:
              </h3>
              <ul className="flex justify-center flex-wrap gap-3 md:pl-6 lg:border-l-4 lg:border-white lg:border-opacity-30">
                <PokemonStats stats={stats} />
              </ul>
            </Animated>
          </div>

          <div className="hidden col-span-full md:block mt-10 lg:mt-10">
            <Animated
              animationIn="slideInUp"
              animationInDuration={2000}
              isVisible={true}
              animationInDelay={500}
            >
              <SearchNav />
            </Animated>
          </div>
        </div>
      )}
    </section>
  );
};

export default PokemonInfo;
