import axios from "axios";
import { PATH } from "../PATH";

const services = {
  getLogin: async (credentials: { username: string; password: string }) => {
    const headers = {
      headers: {
        Authorization:
          "Basic " + btoa(`${credentials.username}:${credentials.password}`),
      },
    };

    return axios
      .get(PATH.base + "/user/list-voting-persons/", headers)
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },

  resetPassword: async (body: any) => {
    return axios
      .post(`${PATH.base}/password-reset/`, body)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },
};

export default services;
