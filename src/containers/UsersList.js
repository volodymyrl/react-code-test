import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import UsersList from "../components/UsersList";
import {
  selectUsers,
  selectIsShowError,
  selectIsShowNoResults,
  selectIsAllUsersLoaded,
  selectLoading
} from "../store/users/selectors";
import { loadUsers } from "../store/users/actions";

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  isError: selectIsShowError,
  isNoResults: selectIsShowNoResults,
  isAllLoaded: selectIsAllUsersLoaded,
  isLoading: selectLoading
});

const mapDispatchToProps = {
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
