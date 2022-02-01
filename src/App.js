import "./App.css";

//React-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Pages
import { Pokedex, PokemonInfo, UserName } from "./pages";

//Components
import ProtectedRoutes from "./components/ProtectedRoutes";
import Loader from "./components/Custom/Loader";

//Redux
import { useSelector } from "react-redux";

function App() {
  //Redux-hooks
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <BrowserRouter>
      {isLoading && <Loader />}

      <Routes>
        <Route path="/" element={<UserName />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:nameOrId" element={<PokemonInfo />} />
          <Route path="*" element={<Navigate to="/pokedex" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
