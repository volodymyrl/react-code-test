import React from "react";
import styles from "./styles.module.css";

const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.loaderInner} />
  </div>
);

export default Loader;
