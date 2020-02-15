import axios from 'axios';

/**
 * @param baseURL
 * @returns {AxiosInstance}
 */
export const createAxiosApi = (baseURL) => axios.create({ baseURL, withCredentials: true });