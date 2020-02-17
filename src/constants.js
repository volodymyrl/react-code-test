import PropTypes from "prop-types";

export const API_URL = "https://reqres.in/api/users/";

export const UserPropType = PropTypes.shape({
  id: PropTypes.number,
  email: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar: PropTypes.string
});
