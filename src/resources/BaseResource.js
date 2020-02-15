import { createAxiosApi } from '../helpers/AxiosHelper';

export default class BaseResource {
    /**
     * @type {object}
     */
    axiosApi;

    constructor(baseUrl) {
        this.axiosApi = createAxiosApi(baseUrl);
        this.axiosApi.interceptors.request.use(this.successRequestInterceptor, this.errorRequestInterceptor);
        this.axiosApi.interceptors.response.use(this.successResponseInterceptor, this.errorResponseInterceptor);
    }

    /**
     * @param path
     * @param params
     * @returns {Promise<*>}
     */
    async getData(path, params = {}) {
        const response = await this.axiosApi.get(path, this._buildQueryParams(params));
        return response.data;
    }

    /**
     * Override and do something before request is sent
     * @param request
     * @returns {*}
     */
    successRequestInterceptor(request) {
        return request;
    }

    /**
     * Override and do something with request error
     * @param error
     * @returns {*}
     */
    errorRequestInterceptor(error) {
        return Promise.reject(error);
    }

    /**
     * Override and do something with response data
     * @param response
     * @returns {*}
     */
    successResponseInterceptor(response) {
        return response;
    }

    /**
     * Override and do something with response error
     * @param error
     * @returns {*}
     */
    errorResponseInterceptor(error) {
        return Promise.reject(error);
    }

    /**
     * Override and return default query params for a resource
     * @returns {{}}
     */
    defaultQueryParams() {
        return {};
    }

    /**
     * @param queryParams
     * @returns {{params: *}}
     * @private
     */
    _buildQueryParams(queryParams) {
        return { params: { ...this.defaultQueryParams(), ...queryParams } };
    }
}