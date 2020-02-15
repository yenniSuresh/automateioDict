import FourtyTwoWordService from "./services/FourtyTwoWordService";
import ConsoleService from "./services/ConsoleService";
import { randomInt, rangeRandomInt } from "./helpers/GenericHelper";

export const defn = async (word) => {
    const response = await FourtyTwoWordService.definitions(word);
    const definitions = response?.map(item => item.text);
    ConsoleService.printTitle('Possible definitions are:');
    ConsoleService.printPoints(definitions);
};

export const syn = async (word) => {
    let response = await FourtyTwoWordService.relatedWords(word);
    response = response.find(item => item.relationshipType === 'synonym');
    const synonyms = response?.words;
    ConsoleService.printTitle('Possible synonyms are:');
    ConsoleService.printPoints(synonyms);
};

export const ant = async (word) => {
    let response = await FourtyTwoWordService.relatedWords(word);
    response = response.find(item => item.relationshipType === 'antonym');
    const antonyms = response?.words;
    ConsoleService.printTitle('Possible antonyms are:');
    ConsoleService.printPoints(antonyms);
};

export const ex = async (word) => {
    const response = await FourtyTwoWordService.examples(word);
    const examples = response?.examples.map(item => item.text);
    ConsoleService.printTitle('Few examples are:');
    ConsoleService.printPoints(examples);
};

export const overview = (word) => {
    Promise.all([defn(word), syn(word), ant(word), ex(word)]);
};

export const randomOverview = async () => {
    const response = await FourtyTwoWordService.randomWord();
    const word = response?.word;
    ConsoleService.printTitle(`RANDOM WORD: ${word}`);
    overview(word);
};

export const play = async () => {
    _startGame(await _bootstrapGame())
};

const _bootstrapGame = async () => {
    let response = await FourtyTwoWordService.randomWord();
    const word = response?.word;
    response = await FourtyTwoWordService.definitions(word);
    const definitions = response?.map(item => item.text);
    response = await FourtyTwoWordService.relatedWords(word);
    response = response.find(item => item.relationshipType === 'synonym');
    const synonyms = response?.words;
    ConsoleService.printTitle('Guess Word Game');
    ConsoleService.printLine(`Given definition: ${definitions[0]}`);
    return { word, definitions, synonyms };
};

const _startGame = async ({ word, definitions, synonyms }) => {
    let selectedGameOptions;
    while (selectedGameOptions !== 3) {
        const guessedWord = await ConsoleService.askInput('What is the word? ');
        if (synonyms.includes(guessedWord) || word === guessedWord) {
            return ConsoleService.printLine('Well played!! Congratulations.');
        }
        selectedGameOptions = await _showGameOptions(definitions, synonyms);
        if (selectedGameOptions === 2) {
            _showHint(definitions, synonyms);
        }
    }
};

const _showGameOptions = async (definitions, synonyms) => {
    ConsoleService.printLine('Give below options:');
    ConsoleService.printPoints(['Try again', 'Hint', 'Quit']);
    const selectedOption = await ConsoleService.askInput('Please enter one option number: ');
    return parseInt(selectedOption);
};

const _showHint = (definitions, synonyms ) => {
    if (randomInt(50) % 2 === 0) {
        definitions.length ? _showDefinitionHint(definitions) : _showSynonymHint(synonyms);
    } else {
        synonyms.length ? _showSynonymHint(synonyms) : _showDefinitionHint(definitions);
    }
};

const _showDefinitionHint = (definitions) => {
    ConsoleService.printLine(`Possible another definition for word is: ${definitions[rangeRandomInt(1, definitions.length - 1)]}`)
};

const _showSynonymHint = (synonyms) => {
    ConsoleService.printLine(`Possible synonym for word is: ${synonyms[randomInt(synonyms.length)]}`)
};