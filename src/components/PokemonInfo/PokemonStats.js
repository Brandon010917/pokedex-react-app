import React from "react";

const StatsPokemon = ({ stats }) => {
  return (
    <>
      {stats?.map((stat) => (
        <li
          key={stat[0]}
          className="bg-gray-100 text-black shadow-lg rounded px-3 py-1.5 h-9 flex items-center uppercase"
        >
          <p className="opacity-50 font-extrabold text-xs">
            {stat[0]}: <span>{stat[1]}</span>
          </p>
        </li>
      ))}
    </>
  );
};

export default StatsPokemon;
