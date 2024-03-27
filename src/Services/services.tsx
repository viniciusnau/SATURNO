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
      .post(`${PATH.base}/user/password-reset/`, body)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log(err));
  },

  getHashValidation: async (checkHash: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const headers = {
      Authorization: `${authorizationMethod} ${
        apiToken || sessionStorage.getItem("credentials")
      }`,
    };

    const params = {
      check_hash: checkHash,
    };

    return axios
      .get(`${PATH.base}/user/check-hash/`, {
        params: params,
        headers: headers,
      })
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => console.log(err));
  },

  getElectionsResults: async (positionId: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const headers = {
      Authorization: `${authorizationMethod} ${
        apiToken || sessionStorage.getItem("credentials")
      }`,
    };

    const params = {
      position_id: positionId,
    };

    return axios
      .get(`${PATH.base}/user/elections-result/`, {
        params: params,
        headers: headers,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao obter resultados das eleições:", error);
        throw error;
      });
  },

  getListCandidates: async (positionId: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const headers = {
      Authorization: `${authorizationMethod} ${
        apiToken || sessionStorage.getItem("credentials")
      }`,
    };

    const params = {
      position_id: positionId,
    };

    return axios
      .get(`${PATH.base}/user/list-candidates/`, {
        params: params,
        headers: headers,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao obter candidatos por IDs:", error);
        throw error;
      });
  },

  getVoteReport: async () => {
    const apiToken = sessionStorage.getItem("apiToken");
    const authorizationMethod = apiToken ? "Token" : "Basic";

    const headers = {
      Authorization: `${authorizationMethod} ${
        apiToken || sessionStorage.getItem("credentials")
      }`,
    };

    return axios
      .get(`${PATH.base}/user/list-candidates/`, {
        headers: headers,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Err:", error);
        throw error;
      });
  },
};

export default services;
