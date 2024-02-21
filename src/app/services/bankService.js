import axios from "../utils/axios";

export const getBanks = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/institutions/`);
};
