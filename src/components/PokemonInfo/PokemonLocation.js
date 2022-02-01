const PokemonLocation = ({ pokemonLocation }) => {
  console.log(pokemonLocation);

  return (
    <p
      className={`absolute text-md bottom-0 lg:-bottom-28 -rotate-90 ${
        pokemonLocation?.length > 30
          ? "-left-40"
          : pokemonLocation === ""
          ? "-left-16"
          : "-left-20"
      }`}
    >
      <span>Region: </span>
      <span className="capitalize">
        {pokemonLocation ? pokemonLocation?.replace(/-/g, " ") : "Unknown"}
      </span>
    </p>
  );
};

export default PokemonLocation;
