import { useState } from "react";

//Icons
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

//Redux
import { useDispatch } from "react-redux";

//Actions
import { setUserName } from "../../redux/actions";

//React-router-dom
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  //State
  const [name, setName] = useState("");

  //Redux-hooks
  const dispatch = useDispatch();

  //Router-hooks
  const navigate = useNavigate();

  //Funcionts
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    dispatch(setUserName(name));
    navigate("/pokedex");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 text-gray-800 w-full p-5 rounded-2xl shadow-md"
    >
      <label htmlFor="userName" className="block font-medium text-lg">
        Hello Trainer!! Enter your name to start
      </label>

      <div className="flex justify-between items-center w-full h-12 mt-3 border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          name="userName"
          className="w-full h-full pl-2 text-sm outline-none"
          placeholder="User Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <button className="bg-ligth-gray h-full p-2" type="submit">
          <ArrowCircleRightIcon className="w-8 h-8 ml-auto" />
        </button>
      </div>
    </form>
  );
};

export default UserForm;
