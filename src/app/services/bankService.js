import axios from "axios";

export const getBanks = () => {
  return axios.get(`${process.env.BASE_URL}/institutions/`);
};
