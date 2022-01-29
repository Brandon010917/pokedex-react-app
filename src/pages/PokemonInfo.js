import { useEffect, useState } from "react";

//Icons & Logo
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import Logo from "../assets/images/pokemon-logo.png";

//Animated
import { Animated } from "react-animated-css";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Actions
import { setIsLoading } from "../redux/actions";

//Axios
import axios from "axios";

//React-router-dom
import { useNavigate, useParams } from "react-router-dom";

//Components
import PokemonStats from "../components/PokemonInfo/PokemonStats";
import SearchNav from "../components/Custom/SearchNav";
import Loader from "../components/Custom/Loader";
import PokemonFeatures from "../components/PokemonInfo/PokemonFeatures";
import PokemonTitle from "../components/PokemonInfo/PokemonTitle";
import PokemonLocation from "../components/PokemonInfo/PokemonLocation";

const PokemonInfo = () => {
  //State
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonNameJp, setPokemonNameJp] = useState("");
  const [locationArea, setLocationArea] = useState("");

  //Redux-hooks
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  //Router-hooks
  const { nameOrId } = useParams();
  const navigate = useNavigate();

  //Effect
  useEffect(() => {
    dispatch(setIsLoading(true));
    const url = "https://pokeapi.co/api/v2/pokemon/" + nameOrId;
    axios
      .get(url)
      .then(({ data }) => setPokemonInfo(data))
      .finally(() => dispatch(setIsLoading(false)));
  }, [dispatch, nameOrId]);

  useEffect(() => {
    const urlName = "https://pokeapi.co/api/v2/pokemon-species/" + nameOrId;
    axios.get(urlName).then(({ data }) => setPokemonNameJp(data.names[0].name));

    const urlLocation = `https://pokeapi.co/api/v2/pokemon/${nameOrId}/encounters`;
    axios
      .get(urlLocation)
      .then(({ data }) => setLocationArea(data[0]?.location_area?.name));
  }, [nameOrId]);

  const renderId =
    pokemonInfo?.id >= 10
      ? `#0${pokemonInfo?.id}`
      : pokemonInfo?.id >= 100
      ? `#${pokemonInfo?.id}`
      : `#00${pokemonInfo?.id}`;

  //Functions
  const stats = pokemonInfo?.stats?.map((stat) => [
    stat.stat.name,
    stat.base_stat,
  ]);

  const prevPage = () => navigate("../pokedex");

  return (
    <section
      className={`${pokemonInfo?.types[0]?.type?.name}-80 relative min-h-screen md:max-h-screen p-8 md:p-3 md:px-7 text-white md:overflow-y-hidden`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        pokemonInfo && (
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

                <PokemonLocation locationArea={locationArea} />
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
                      pokemonInfo.sprites.other["official-artwork"]
                        .front_default
                    }
                    alt={pokemonInfo.name}
                    className="max-w-xs lg:max-w-sm md:mt-10 ml-12 lg:m-4"
                   
                  />
                </Animated>

                <p className="text-black font-semibold text-6xl lg:text-7xl text-opacity-20 lg:absolute lg:top-20 lg:-left-40">
                  {pokemonNameJp}
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
                <ul className="flex justify-center flex-wrap gap-3">
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
        )
      )}
    </section>
  );
};

export default PokemonInfo;
