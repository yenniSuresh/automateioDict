import { createAxiosApi } from '../Helpers/AxiosHelper';
import BaseResource from "./BaseResource";

class FourtyTwoWordsResource extends BaseResource {
    /**
     * API key
     * @type {string}
     */
    API_KEY = 'b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164';

    randomWord() {
        return this.axiosApi.get('/words/randomWord', this._buildQueryParams());
    }

    definitions(word) {
        return this.axiosApi.get(`/word/${word}/definitions`, this._buildQueryParams());
    }

    examples(word) {
        return this.axiosApi.get(`/word/${word}/examples`, this._buildQueryParams());
    }

    relatedWords(word) {
        return this.axiosApi.get(`/word/${word}/relatedWords`, this._buildQueryParams());
    }

    /**
     * @param params
     * @returns {any}
     * @private
     */
    _buildQueryParams(params = {}) {
        return Object.assign(params, { api_key: this.API_KEY })
    }
}

export default new FourtyTwoWordsResource('https://fourtytwowords');