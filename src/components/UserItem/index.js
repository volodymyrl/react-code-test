import React from "react";
import { UserPropType } from "../../constants";
import styles from "./styles.module.css";

const UserItem = ({ user: { email, first_name, last_name, avatar } }) => (
  <a href={`mailto:${email}`} className={styles.item}>
    <img src={avatar} alt="avatar" className={styles.avatar} />
    {first_name} {last_name}
  </a>
);

UserItem.propTypes = {
  user: UserPropType
};

export default UserItem;
