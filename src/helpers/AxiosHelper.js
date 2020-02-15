import axios from 'axios';

export const createAxiosApi = (baseURL) => axios.create({ baseURL, withCredentials: true });