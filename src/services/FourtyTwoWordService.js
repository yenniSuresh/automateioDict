import BaseService from './BaseService';
import FourtyTwoWordsResource from '../resources/FourtyTwoWordsResource';

class FourtyTwoWordService extends BaseService {

    randomWord() {
        return this.resource.randomWord();
    }

    definitions(word) {
        return this.resource.definitions(word);
    }

    examples(word) {
        return this.resource.examples(word);
    }

    relatedWords(word) {
        return this.resource.relatedWords(word);
    }
}

export default new FourtyTwoWordService(FourtyTwoWordsResource);