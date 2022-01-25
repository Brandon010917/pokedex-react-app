//Redux
import { useSelector } from "react-redux";

function App() {
  //Redux-hooks
  const userName = useSelector((state) => state.userName);

  return (
    <div className="App">
      <h1>{userName}</h1>
    </div>
  );
}

export default App;
