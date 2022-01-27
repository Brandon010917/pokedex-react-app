import React from "react";

const StatsPokemon = ({ statName, statBase }) => {
  return (
    <li className="bg-white text-black shadow-lg rounded px-3 py-1.5 h-9 flex items-center">
      <p className="opacity-50 font-extrabold text-xs">
        {statName.toUpperCase()}: <span>{statBase}</span>
      </p>
    </li>
  );
};

export default StatsPokemon;
