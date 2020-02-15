import FourtyTwoWordService from './services/FourtyTwoWordService';
import ConsoleService from './services/ConsoleService';
import { randomInt, rangeRandomInt } from './helpers/GenericHelper';

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
        ConsoleService.printTitle('Possible definitions are:');
        ConsoleService.printPoints(definitions);
    }

    /**
     * @returns {Promise<void>}
     */
    async showSynonyms() {
        const synonyms = await this._getSynonyms();
        ConsoleService.printTitle('Possible synonyms are:');
        ConsoleService.printPoints(synonyms);
    }

    /**
     * @returns {Promise<void>}
     */
    async showAntonyms() {
        const antonyms = await this._getAntonyms();
        ConsoleService.printTitle('Possible antonyms are:');
        ConsoleService.printPoints(antonyms);
    }

    /**
     * @returns {Promise<void>}
     */
    async showExamples() {
        const examples = await this._getExamples();
        ConsoleService.printTitle('Few examples are:');
        ConsoleService.printPoints(examples);
    }

    /**
     * @returns {Promise<[void, void, void, void]>}
     */
    showOverview() {
        ConsoleService.printTitle(`WORD: ${this.word}`);
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
        this.showOverview();
    }

    /**
     * @returns {Promise<void>}
     */
    async playGuessGame() {
        const game = await this._bootstrapGame();
        this._startGame(game)
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
        ConsoleService.printTitle('Guess Word Game');
        ConsoleService.printLine(`Given definition: ${definitions[0]}`);
        while (selectedGameOptions !== 3) {
            const guessedWord = await ConsoleService.askInput('What is the word? ');
            if (synonyms.includes(guessedWord) || this.word === guessedWord) {
                return ConsoleService.printLine('Well played!! Congratulations.');
            }
            selectedGameOptions = await this._showGameOptions();
            if (selectedGameOptions === 2) {
                this._showHint(definitions, synonyms);
            }
        }
        this.showOverview();
    };

    /**
     * @returns {Promise<number>}
     * @private
     */
    async _showGameOptions() {
        ConsoleService.printLine('Give below options:');
        ConsoleService.printPoints(['Try again', 'Hint', 'Quit']);
        const selectedOption = await ConsoleService.askInput('Please enter one option number: ');
        return parseInt(selectedOption);
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
        ConsoleService.printLine(`Possible another definition for word is: ${randomDefinition}`);
    };

    /**
     * @param synonyms
     * @private
     */
    _showSynonymHint(synonyms) {
        const randomSynonym = synonyms[randomInt(synonyms.length)];
        ConsoleService.printLine(`Possible synonym for word is: ${randomSynonym}`);
    };
}