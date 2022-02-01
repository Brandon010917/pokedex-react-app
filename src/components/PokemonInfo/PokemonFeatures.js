const PokemonFeatures = ({ name, feature, measure }) => {
  return (
    <p className="text-md">
      <span>
        {name}: {feature / 10}
      </span>
      <span className="text-sm">{measure}</span>
    </p>
  );
};

export default PokemonFeatures;
