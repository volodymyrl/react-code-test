import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import UsersList from "./containers/UsersList";
import styles from "./styles.module.css";
import { useTimeout } from "./hooks/useTimeout";

const SHOW_USERS_DELAY = 3000;

const App = ({ loadUsers }) => {
  const [isLoadingScreen, toggleLoadingScreen] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  useTimeout(() => toggleLoadingScreen(false), SHOW_USERS_DELAY);

  return (
    <div className="App">
      {isLoadingScreen ? (
        <div className={styles.loadingScreen}>
          <Loader />
        </div>
      ) : (
        <UsersList />
      )}
    </div>
  );
};

export default App;
