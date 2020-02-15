import BaseResource from './BaseResource';

class FourtyTwoWordsResource extends BaseResource {
    /**
     * API key
     * @type {string}
     */
    API_KEY = 'b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164';

    randomWord() {
        return this.getData('/words/randomWord');
    }

    definitions(word) {
        return this.getData(`/word/${word}/definitions`);
    }

    examples(word) {
        return this.getData(`/word/${word}/examples`);
    }

    relatedWords(word) {
        return this.getData(`/word/${word}/relatedWords`);
    }

    /**
     * @returns {{api_key: string}}
     */
    defaultQueryParams() {
        return { api_key: this.API_KEY };
    }
}

export default new FourtyTwoWordsResource('https://fourtytwowords.herokuapp.com/');