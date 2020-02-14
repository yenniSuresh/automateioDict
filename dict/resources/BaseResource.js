import { createAxiosApi } from "../Helpers/AxiosHelper";

export default class BaseResource {
    /**
     * @type {object}
     */
    axiosApi;

    constructor(baseUrl) {
        this.axiosApi = createAxiosApi(baseUrl);
    }
}