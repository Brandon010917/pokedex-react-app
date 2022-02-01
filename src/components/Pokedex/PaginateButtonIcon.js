import React from "react";

const PaginateButtonIcon = ({ disabled, dispatch, Icon, rounded }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-white hover:bg-gray-50 text-gray-500 p-1.5 font-bold text-md border border-gray-300 rounded-${rounded}-lg disabled:opacity-50`}
      onClick={dispatch}
    >
      {Icon}
    </button>
  );
};

export default PaginateButtonIcon;
