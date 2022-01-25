import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

//Reducer
import rootReducer from "./redux";

//Store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
