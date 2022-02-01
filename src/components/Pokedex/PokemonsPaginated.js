import { useEffect, useState } from "react";

//Icons
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

//Redux
import { useDispatch } from "react-redux";

//Actions
import { setPage } from "../../redux/actions";

//Components
import PaginateButtonIcon from "./PaginateButtonIcon";

const PokemonsPaginated = ({ page, totalPages }) => {
  const [arrayOfCurrentPage, setArrayOfCurrentPage] = useState([]);

  //Redux-hooks
  const dispatch = useDispatch();

  //Paginated
  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  //Effect
  useEffect(() => {
    let numOfPages = [];

    if (totalPages <= 6) {
      numOfPages = [1, 2, 3, 4, 5, 6];
    } else {
      if (page <= 5) {
        numOfPages = [1, 2, 3, 4, 5];
      } else if (page >= 6 && page <= totalPages - 3) {
        for (let i = page - 2; i <= page + 2; i++) {
          numOfPages = [...numOfPages, i];
        }
      } else {
        for (let i = totalPages - 3; i <= totalPages; i++) {
          numOfPages.push(i);
        }
      }
    }

    setArrayOfCurrentPage(numOfPages);
  }, [page, totalPages]);

  return (
    <div className="w-full md:max-w-xl mx-auto flex justify-center flex-wrap mt-6 text-md">
      <PaginateButtonIcon
        disabled={page === 1}
        dispatch={() => dispatch(setPage(1))}
        Icon={<ChevronDoubleLeftIcon className="h-5 w-5" />}
        rounded="l"
      />

      <PaginateButtonIcon
        disabled={page === 1}
        dispatch={() => dispatch(setPage(page - 1))}
        Icon={<ChevronLeftIcon className="h-5 w-5" />}
      />

      <div className="flex">
        {arrayOfCurrentPage.map((numPage) => (
          <button
            key={numPage}
            className={`px-4 py-2 font-bold border ${
              page === numPage
                ? "bg-red-600 text-white"
                : "bg-white border-gray-300 text-gray-500"
            }`}
            onClick={() => dispatch(setPage(numPage))}
          >
            {numPage}
          </button>
        ))}
      </div>

      <PaginateButtonIcon
        disabled={page === totalPages}
        dispatch={() => dispatch(setPage(page + 1))}
        Icon={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
      />

      <PaginateButtonIcon
        disabled={page === totalPages}
        dispatch={() => dispatch(setPage(totalPages))}
        Icon={<ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />}
        rounded="r"
      />
    </div>
  );
};

export default PokemonsPaginated;
