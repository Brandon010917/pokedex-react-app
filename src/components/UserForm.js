import { useEffect, useState } from "react";

//Icons
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

//Logo
import logo from "../assets/images/pokemon-logo.png";

//React-router-dom
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";

//Actions
import { getPokemonsThunk, setUserName } from "../redux/actions";

const UserForm = () => {
  //State
  const [name, setName] = useState("");

  //Redux-hooks
  const dispatch = useDispatch();

  //Router-hooks
  const navigate = useNavigate();

  //Effect
  useEffect(() => {
    dispatch(getPokemonsThunk());
    /* dispatch(getPokemonsTypesThunk()); */
  }, [dispatch]);

  //Funcionts
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) return;

    dispatch(setUserName(name));
    navigate("/pokedex");
  };

  return (
    <div className="user-form p-8 min-h-screen bg-gray-200">
      <div className="max-w-lg">
        <img src={logo} alt="Logo Pokemon" className="block mb-4" />
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 bg-white text-dark-gray rounded-2xl shadow-2xl"
        >
          <label htmlFor="userName" className="block text-lg font-medium">
            Enter your name to start
          </label>
          <div className="mt-3 border rounded-md h-12 w-full flex items-center justify-between bg-white text-gray-700 overflow-hidden ">
            <input
              type="text"
              name="userName"
              id="userName"
              className="block pl-2 sm:text-sm h-full w-full outline-none"
              placeholder="User Name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <button className="bg-gray-200 h-full p-2" type="submit">
              <ArrowCircleRightIcon className="ml-auto w-8 h-8 text-dark-gray" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
