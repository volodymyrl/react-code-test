import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserPropType } from "../../constants";
import useEventListener from "../../hooks/useEventListener";
import { debounce } from "../../helpers";
import UserItem from "../UserItem";
import Loader from "../Loader";
import { Header } from "../Header";
import styles from "./styles.module.css";

const SCROLL_OFFSET = 100;
const DEBOUNCE_TIME = 300;

const UsersList = ({ isError, isNoResults, users, isLoading, isAllLoaded, loadUsers }) => {
  const grid = useRef(null);
  const [isShowLoadMoreButton, setShowLoadMoreButton] = useState(false);

  const handleResize = () => {
    if (window.pageYOffset + window.innerHeight > grid.current.scrollHeight) {
      // show load more button if scroll not available
      setShowLoadMoreButton(true);
    } else {
      setShowLoadMoreButton(false);
    }
  };

  const loadMore = () => {
    const isScrolledToBottom = window.pageYOffset + window.innerHeight >= grid.current.scrollHeight - SCROLL_OFFSET;
    if (!isLoading && isScrolledToBottom) {
      loadMoreDebounce();
    }
  };

  const loadMoreDebounce = debounce(loadUsers, DEBOUNCE_TIME);
  const handleResizeDebounce = debounce(handleResize, DEBOUNCE_TIME);

  useEffect(() => {
    handleResize();
  }, []);

  useEventListener("resize", handleResizeDebounce, !isAllLoaded);
  useEventListener("scroll", loadMore, !isAllLoaded);

  return (
    <div ref={grid}>
      <Header />
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
      {isShowLoadMoreButton && !isAllLoaded && (
        <button className={styles.loadMore} onClick={loadUsers} disabled={isLoading}>
          Load more
        </button>
      )}
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(UserPropType),
  isLoading: PropTypes.bool,
  isAllLoaded: PropTypes.bool,
  isError: PropTypes.bool,
  isNoResults: PropTypes.bool,
  loadUsers: PropTypes.func
};

UsersList.defaultProps = {
  users: [],
  isLoading: false,
  isAllLoaded: false,
  isNoResults: false,
  isError: false
};

export default UsersList;
