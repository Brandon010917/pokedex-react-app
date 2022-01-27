import "./App.css";

//React-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Components
import ProtectedRoutes from "./components/ProtectedRoutes";
import Pokedex from "./components/Pokedex";
import PokemonInfo from "./components/PokemonInfo";
import UserForm from "./components/UserForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserForm />} />
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
