import { connect } from "react-redux";
import { loadUsers } from "../store/users/actions";
import App from "../App";

const mapDispatchToProps = {
  loadUsers
};

export default connect(null, mapDispatchToProps)(App);
