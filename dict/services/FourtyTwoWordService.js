import BaseService from "./BaseService";
import FourtyTwoWordsResource from "../resources/FourtyTwoWordsResource";

class FourtyTwoWordService extends BaseService {

    randomWord() {
        return this.resource.randomWord();
    }

    definitions(word) {
        return this.resource.definitions();
    }

    examples(word) {
        return this.resource.examples();
    }

    relatedWords(word) {
        return this.resource.relatedWords();
    }
}

export default FourtyTwoWordService(FourtyTwoWordsResource);