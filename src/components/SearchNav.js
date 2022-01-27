//Components
import PokemonSearch from "./PokemonSearch";
import SelectFilter from "./SelectFilter";

//React-router
import { useParams } from "react-router-dom";

const SearchNav = () => {
  const { nameOrId } = useParams();

  return (
    <div
      className={`grid sm:grid-cols-2 ${
        !nameOrId && "md:grid-cols-3 mb-8 gap-y-2"
      } justify-center px-8 gap-x-4`}
    >
      <PokemonSearch placeholder="Search name" type="text" />
      <PokemonSearch placeholder="Search number" type="number" />
      {!nameOrId && <SelectFilter />}
    </div>
  );
};

export default SearchNav;
