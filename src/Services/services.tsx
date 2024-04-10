import axios from "axios";
import { PATH } from "../PATH";

const services = {
  getLogin: async (credentials: { username: string; password: string }) => {
    const body = {
      username: credentials.username,
      password: credentials.password,
    };

    return axios
      .post(`${PATH.base}/user/token/`, body)
      .then((response: any) => {
        const token = response.data.access;
        sessionStorage.setItem("apiToken", token);
        return response;
      })
      .catch((err: any) => console.log(err));
  },

  logout: async () => {
    const apiToken = sessionStorage.getItem("apiToken");
    const headers = {
      Authorization: `Bearer ${apiToken}`,
    };

    return axios
      .post(`${PATH.base}/user/token/logout/`, null, {
        headers: headers,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error logging out:", error);
        throw error;
      });
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
    const headers = {
      Authorization: `Bearer ${apiToken}`,
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
    const headers = {
      Authorization: `Bearer ${apiToken}`,
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
        console.error("Error fetching election results:", error);
        throw error;
      });
  },

  getListCandidates: async (positionId: string) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const headers = {
      Authorization: `Bearer ${apiToken}`,
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
        console.error("Error fetching candidates by IDs:", error);
        throw error;
      });
  },

  getTokenLifetime: async () => {
    const apiToken = sessionStorage.getItem("apiToken");
    const headers = {
      Authorization: `Bearer ${apiToken}`,
    };

    return axios
      .get(`${PATH.base}/user/token-lifetime/`, {
        headers: headers,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching remaining token time:", error);
        throw error;
      });
  },
};

export default services;
