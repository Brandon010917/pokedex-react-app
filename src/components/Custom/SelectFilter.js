//Redux
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByTypePokemons, resetPage } from "../../redux/actions";

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
    dispatch(resetPage());
  };

  return (
    <div className="h-12">
      <select
        className="bg-gray-100 text-gray-800 w-full h-full px-3 py-1.5 font-medium text-sm rounded"
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
