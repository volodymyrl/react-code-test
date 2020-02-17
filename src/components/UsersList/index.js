import React from "react";
import PropTypes from "prop-types";
import { UserPropType } from "../../constants";
import UserItem from "../UserItem";
import Loader from "../Loader";
import styles from "./styles.module.css";

const UsersList = ({ isError, isNoResults, users, isLoading, isAllLoaded }) => {
  return (
    <>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
      {isLoading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}
      {isAllLoaded && <p className={styles.message}>All users have been loaded</p>}
      {isNoResults && <p className={styles.message}>No user for loading</p>}
      {isError && <p className={styles.errorMsg}>Something went wrong, please contact support team</p>}
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(UserPropType),
  isLoading: PropTypes.bool,
  isAllLoaded: PropTypes.bool,
  isError: PropTypes.bool,
  isNoResults: PropTypes.bool
};

UsersList.defaultProps = {
  users: [],
  isLoading: false,
  isAllLoaded: false,
  isNoResults: false,
  isError: false
};

export default UsersList;
