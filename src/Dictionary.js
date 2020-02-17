import FourtyTwoWordService from './services/FourtyTwoWordService';
import { printTitle, printPoints, printLine, askInput } from './helpers/ConsoleHelper';
import { randomInt, rangeRandomInt } from './helpers/GenericHelper';
import InvalidInputError from './errors/InvalidInputError';

export default class Dictionary {
    /**
     * @type {string}
     */
    word;

    constructor(word = null) {
        this.word = word;
    }

    /**
     * @returns {Promise<void>}
     */
    async showDefinition() {
        const definitions = await this._getDefinitions();
        printTitle('Possible definitions are:');
        printPoints(definitions);
    }

    /**
     * @returns {Promise<void>}
     */
    async showSynonyms() {
        const synonyms = await this._getSynonyms();
        printTitle('Possible synonyms are:');
        printPoints(synonyms);
    }

    /**
     * @returns {Promise<void>}
     */
    async showAntonyms() {
        const antonyms = await this._getAntonyms();
        printTitle('Possible antonyms are:');
        printPoints(antonyms);
    }

    /**
     * @returns {Promise<void>}
     */
    async showExamples() {
        const examples = await this._getExamples();
        printTitle('Few examples are:');
        printPoints(examples);
    }

    /**
     * @returns {Promise<[void, void, void, void]>}
     */
    showOverview() {
        printTitle(`WORD: ${this.word}`);
        return Promise.all([
            this.showDefinition(),
            this.showSynonyms(),
            this.showAntonyms(),
            this.showExamples()
        ]);
    }

    /**
     * @returns {Promise<void>}
     */
    async showRandomOverview() {
        await this._setRandomWord();
        return this.showOverview();
    }

    /**
     * @returns {Promise<void>}
     */
    async playGuessGame() {
        const game = await this._bootstrapGame();
        return this._startGame(game)
    }

    /**
     * @param word
     * @private
     */
    _setWord(word) {
        this.word = word;
    }

    /**
     * @returns {Promise<void>}
     * @private
     */
    async _setRandomWord() {
        const response = await FourtyTwoWordService.randomWord();
        this._setWord(response?.word);
    }

    /**
     * @returns {Promise<*>}
     * @private
     */
    async _getDefinitions() {
        const response = await FourtyTwoWordService.definitions(this.word);
        return response?.map(item => item.text);
    }

    /**
     * @returns {*}
     * @private
     */
    _getRelatedWords() {
        return FourtyTwoWordService.relatedWords(this.word);
    }

    /**
     * @returns {Promise<*>}
     * @private
     */
    async _getSynonyms() {
        let relatedWords = await this._getRelatedWords();
        relatedWords = relatedWords.find(item => item.relationshipType === 'synonym');
        return relatedWords?.words;
    }

    /**
     * @returns {Promise<*>}
     * @private
     */
    async _getAntonyms() {
        let relatedWords = await this._getRelatedWords();
        relatedWords = relatedWords.find(item => item.relationshipType === 'antonym');
        return relatedWords?.words;
    }

    /**
     * @returns {Promise<void>}
     * @private
     */
    async _getExamples() {
        const response = await FourtyTwoWordService.examples(this.word);
        return response?.examples.map(item => item.text);
    }

    /**
     * @returns {Promise<{synonyms: *, definitions: *}>}
     * @private
     */
    async _bootstrapGame() {
        await this._setRandomWord();
        const definitions = await this._getDefinitions();
        const synonyms = await this._getSynonyms();
        return { definitions, synonyms };
    };

    /**
     * @param definitions
     * @param synonyms
     * @returns {Promise<void>}
     * @private
     */
    async _startGame({ definitions, synonyms }) {
        let selectedGameOptions;
        printTitle('Guess Word Game');
        printLine(`Given definition: ${definitions[0]}`);
        do {
            const guessedWord = await askInput('What is the word? ');
            if (synonyms.includes(guessedWord) || this.word === guessedWord) {
                return printLine('Well played!! Congratulations.');
            }
            selectedGameOptions = await this._showGameOptions();
            if (selectedGameOptions === 2) {
                this._showHint(definitions, synonyms);
            }
        } while (selectedGameOptions !== 3)
        return this.showOverview();
    };

    /**
     * @returns {Promise<number>}
     * @private
     */
    async _showGameOptions() {
        printLine('Give below options:');
        const points = ['Try again', 'Hint', 'Quit'];
        printPoints(points);
        let selectedOption = await askInput('Please enter one option number: ');
        selectedOption = parseInt(selectedOption);
        if (isNaN(selectedOption)) {
            throw new InvalidInputError('Input should be a number');
        }
        if (selectedOption < 1 || selectedOption > points.length) {
            throw new InvalidInputError(`Please select option between 1 to ${points.length}`);
        }
        return selectedOption;
    };

    /**
     * @param definitions
     * @param synonyms
     * @private
     */
    _showHint(definitions, synonyms ) {
        if (randomInt(50) % 2 === 0) {
            definitions.length ? this._showDefinitionHint(definitions) : this._showSynonymHint(synonyms);
        } else {
            synonyms.length ? this._showSynonymHint(synonyms) : this._showDefinitionHint(definitions);
        }
    };

    /**
     * @param definitions
     * @private
     */
    _showDefinitionHint(definitions) {
        const randomDefinition = definitions[rangeRandomInt(1, definitions.length - 1)];
        printLine(`Possible another definition for word is: ${randomDefinition}`);
    };

    /**
     * @param synonyms
     * @private
     */
    _showSynonymHint(synonyms) {
        const randomSynonym = synonyms[randomInt(synonyms.length)];
        printLine(`Possible synonym for word is: ${randomSynonym}`);
    };
}