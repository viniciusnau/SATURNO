import axios from "axios";
import { PATH } from "../PATH";
import { IVoteData, IPositionId } from "../Types/Types";
 
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

  getListCandidatesByPositionId: async (data: IPositionId) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";
    const positionId = data.position_id;

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
    .get(`${PATH.base}/list-voting-persons/?position_id=${positionId}`, header)
    .then((data: any) => {return data})
    .catch((err: any) => console.log("err", err))
  },

  postVote: async (data: IVoteData) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const header = {
      headers: {
        Authorization: `${authorizationMethod} ${
          apiToken || sessionStorage.getItem("credentials")
        }`,
      },
    };
    return axios
    .post(`${PATH.base}/create-vote/`, data, header)
    .then((data: any) => {return data})
    .catch((err: any) => console.log("err", err))
  }  
};

export default services;
