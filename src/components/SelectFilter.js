//Redux
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByTypePokemons } from "../redux/actions";

const SelectFilter = () => {
  //State
  const [selectType, setSelectType] = useState("");

  //Redux-hooks
  const pokemonsTypes = useSelector((state) => state.pokemonsTypes);
  const dispatch = useDispatch();

  //Functions
  const renderOptionsTypes = () => {
    return pokemonsTypes?.map((type) => (
      <option key={type.name} value={type.name}>
        {type.name.charAt(0).toUpperCase()}
        {type.name.slice(1)}
      </option>
    ));
  };

  const handleChange = (type) => {
    setSelectType(type);
    dispatch(filterByTypePokemons(type));
  };

  return (
    <div className="h-12">
      <select
        className="w-full px-3 py-1.5 h-full bg-white rounded text-base"
        value={selectType}
        onChange={({ target }) => handleChange(target.value)}
      >
        <option value="" disabled>
          Filter by type
        </option>
        <option value="all">All</option>
        {renderOptionsTypes()}
      </select>
    </div>
  );
};

export default SelectFilter;
