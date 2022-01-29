const PokemonLocation = ({ locationArea }) => {
  return (
    <p className="absolute text-sm bottom-0 lg:-bottom-28 -left-20 -rotate-90">
      <span>Region: </span>
      <span className="capitalize">
        {locationArea ? locationArea?.replace(/-/g, " ") : "Unknown"}
      </span>
    </p>
  );
};

export default PokemonLocation;
