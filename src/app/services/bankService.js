import axios from "../utils/axios";

export const getBanks = () => {
  return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/institutions/`);
};
export const linksBank = (obj) => {
  return this.http.post(`${process.env.NEXT_PUBLIC_BASE_URL}/links/`, obj);
};

export const transactionList = () => {
  const ruta = `${environment.BASE_URL}/transactions/?page=1&link=${id}`;

  return this.http.get(ruta);
};
