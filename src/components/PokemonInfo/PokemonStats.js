import React from "react";

const PokemonStats = ({ stats }) => {
  return (
    <>
      {stats?.map((stat) => (
        <li
          key={stat[0]}
          className="bg-gray-100 text-black shadow-lg rounded px-3 py-1.5 h-9 flex items-center uppercase"
        >
          <p className="font-black text-sm opacity-50">
            {stat[0]}: <span>{stat[1]}</span>
          </p>
        </li>
      ))}
    </>
  );
};

export default PokemonStats;
