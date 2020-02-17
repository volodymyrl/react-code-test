import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Loader } from "./components/Loader";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Loader />
      </div>
    </Provider>
  );
};

export default App;
