import axios from "axios";
import { PATH } from "../PATH";
import { IVoteData, IPositionId, IRegister } from "../Types/Types";

const services = {
  getLogin: async (credentials: { username: string; password: string }) => {
    const body = {
      username: credentials.username,
      password: credentials.password,
    };

    return axios
      .post(`${PATH.base}/user/token/`, body)
      .then((response: any) => {
        sessionStorage.setItem("apiToken", response.data.access);
        sessionStorage.setItem("userId", response.data.user_id);
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

  meId: async () => {
    const apiToken = sessionStorage.getItem("apiToken");
    const headers = {
      Authorization: `Bearer ${apiToken}`,
    };

    return axios
      .get(`${PATH.base}/user/me/`, { headers: headers })
      .then((data: any) => {
        return data.data;
      })
      .catch((error: any) => {
        console.error("Error fetching user data: ", error);
        throw error;
      });
  },

  getListCandidatesByPositionId: async (data: IPositionId) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const positionId = data.position_id;
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
      .then((data: any) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching remaining token time:", error);
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
      .then((data: any) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching remaining token time:", error);
        throw error;
      });
  },

  postVote: async (data: IVoteData) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const header = {
      Authorization: `Bearer ${apiToken}`,
    };
    const headers = {
      headers: header,
    };
    return axios
      .post(`${PATH.base}/user/create-vote/`, data, headers)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log("err", err));
  },

  postRegister: async (data: IRegister) => {
    return axios
      .post(`${PATH.base}/user/create-persons/`, data)
      .then((data: any) => {
        return data;
      })
      .catch((err: any) => console.log("err", err));
  },
  // pdf: 1 - public defenser, 2: conselho, 0: eleitores
  downloadElectionsResultPDF: async (positionId: any) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const headers = {
      Authorization: `Bearer ${apiToken}`,
    };

    const params = {
      position_id: positionId,
    };

    return axios
      .get(`${PATH.base}/user/elections-result-pdf-file/`, {
        params: params,
        headers: headers,
        responseType: "blob",
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
        throw error;
      });
  },

  // relatorio de votacao
  getElectionsResultPDFData: async (positionId: any) => {
    const apiToken = sessionStorage.getItem("apiToken");
    const headers = {
      Authorization: `Bearer ${apiToken}`,
    };

    const params = {
      position_id: positionId,
    };

    return axios
      .get(`${PATH.base}/user/elections-result-pdf-data/`, {
        params: params,
        headers: headers,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching PDF data:", error);
        throw error;
      });
  },

  downloadHashReportPDF: async () => {
    const apiToken = sessionStorage.getItem("apiToken");
    const headers = {
      Authorization: `Bearer ${apiToken}`,
    };

    return axios
      .get(`${PATH.base}/user/hash-report/`, {
        headers: headers,
        responseType: "blob",
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
        throw error;
      });
  },
};

export default services;
