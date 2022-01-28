import React from "react";

const PokemonTypeBtn = ({ bgColor, name }) => {
  return (
    <button
      className={`${bgColor}-80 block h-9 px-3.5 py-1.5 first:mb-2 font-semibold text-sm sm:text-base rounded first-letter:uppercase`}
    >
      {name}
    </button>
  );
};

export default PokemonTypeBtn;
