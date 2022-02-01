import React from "react";

const PokemonTitle = ({ id, name }) => {
  return (
    <div className="mt-10 font-black">
      <h2 className="text-xl">{id}</h2>
      <h1 className="text-4xl first-letter:uppercase">{name}</h1>
    </div>
  );
};

export default PokemonTitle;
