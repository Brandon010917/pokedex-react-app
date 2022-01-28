//Components
import PokemonSearch from "./PokemonSearch";
import SelectFilter from "./SelectFilter";

//React-router
import { useParams } from "react-router-dom";

const SearchNav = () => {
  const { nameOrId } = useParams();

  return (
    <div
      className={`relative grid sm:grid-cols-2 justify-center px-8 gap-x-4 ${
        !nameOrId && "md:grid-cols-3 gap-y-2 mb-8"
      } z-30`}
    >
      <PokemonSearch placeholder="Search name" type="text" />
      <PokemonSearch placeholder="Search number" type="number" />
      {!nameOrId && <SelectFilter />}
    </div>
  );
};

export default SearchNav;
