import BaseResource from './BaseResource';
import { getEnvKeyValue } from '../helpers/GenericHelper';

class FourtyTwoWordsResource extends BaseResource {
    randomWord() {
        return this.getData('/words/randomWord');
    }

    /**
     * @param word
     * @returns {Promise<*>}
     */
    definitions(word) {
        return this.getData(`/word/${word}/definitions`);
    }

    /**
     * @param word
     * @returns {Promise<*>}
     */
    examples(word) {
        return this.getData(`/word/${word}/examples`);
    }

    /**
     * @param word
     * @returns {Promise<*>}
     */
    relatedWords(word) {
        return this.getData(`/word/${word}/relatedWords`);
    }

    /**
     * @returns {{api_key: string}}
     */
    defaultQueryParams() {
        return { api_key: getEnvKeyValue('FOURTY_TWO_WORDS_API_KEY') };
    }
}

export default new FourtyTwoWordsResource(getEnvKeyValue('FOURTY_TWO_WORDS_DOMAIN'));