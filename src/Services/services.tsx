import axios from 'axios';
import { PATH } from '../PATH';
import { IVoteData, IPositionId } from '../Types/Types';

const services = {
    getLogin: async (credentials: { username: string; password: string }) => {
        const headers = {
            headers: {
                Authorization:
                    'Basic ' +
                    btoa(`${credentials.username}:${credentials.password}`),
            },
        };

        return axios
            .get(PATH.base + '/list-voting-persons/', headers)
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

    meId: async () => {
        const apiToken = sessionStorage.getItem('apiToken');
        const authorizationMethod = apiToken ? 'Token' : 'Basic';

        const header = {
            Authorization: `${authorizationMethod} ${
                apiToken || sessionStorage.getItem('credentials')
            }`,
        };

        return axios
            .get(`${PATH.base}/me/`, { headers: header })
            .then((data: any) => {
                return data.data;
            })
            .catch((err: any) => console.log('err', err));
    },

    getListCandidatesByPositionId: async (data: IPositionId) => {
        const apiToken = sessionStorage.getItem('apiToken');
        const authorizationMethod = apiToken ? 'Token' : 'Basic';
        const positionId = data.position_id;

        const header = {
            Authorization: `${authorizationMethod} ${
                apiToken || sessionStorage.getItem('credentials')
            }`,
        };

        const params = {
            position_id: positionId,
        };

        return axios
            .get(`${PATH.base}/list-candidates/`, {
                params: params,
                headers: header,
            })
            .then((data: any) => {
                return data;
            })
            .catch((err: any) => console.log('err', err));
    },

    getListCandidates: async (data: IPositionId) => {
        const apiToken = sessionStorage.getItem('apiToken');
        const authorizationMethod = apiToken ? 'Token' : 'Basic';
        const positionId = data.position_id;

        const header = {
            headers: {
                Authorization: `${authorizationMethod} ${
                    apiToken || sessionStorage.getItem('credentials')
                }`,
            },
        };
        return axios
            .get(
                `${PATH.base}/list-candidates/?position_id=${positionId}`,
                header
            )
            .then((data: any) => {
                return data;
            })
            .catch((err: any) => console.log('err', err));
    },

    postVote: async (data: IVoteData) => {
        const apiToken = sessionStorage.getItem('apiToken');
        const authorizationMethod = apiToken ? 'Token' : 'Basic';

        const header = {
            headers: {
                Authorization: `${authorizationMethod} ${
                    apiToken || sessionStorage.getItem('credentials')
                }`,
            },
        };
        return axios
            .post(`${PATH.base}/create-vote/`, data, header)
            .then((data: any) => {
                return data;
            })
            .catch((err: any) => console.log('err', err));
    },
};

export default services;
