import axios from "axios";
const URL_REGISTER =
  "https://whispering-river-87788.herokuapp.com/api/register";

const register = (userInfo) => {
  return axios.post(URL_REGISTER, userInfo);
};

export default { register };
