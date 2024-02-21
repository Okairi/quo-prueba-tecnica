import axios from "../utils/axios";

export const getBanks = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/institutions/`);
};
export const createLink = (obj) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/links/`, obj);
};

export const transactionList = (id) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/transactions/?page=1&link=${id}`
  );
};
