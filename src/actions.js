import FourtyTwoWordService from "./services/FourtyTwoWordService";
import CmdService from "./services/CmdService";

export const defn = async (word) => {
    const response = await FourtyTwoWordService.definitions(word);
    const definitions = response?.map(item => item.text);
    CmdService.printTitle('#Possible definitions are:');
    CmdService.printPoints(definitions);
};

export const syn = async (word) => {
    let response = await FourtyTwoWordService.relatedWords(word);
    response = response.find(item => item.relationshipType === 'synonym');
    const synonyms = response?.words;
    CmdService.printTitle('#Possible synonyms are:');
    CmdService.printPoints(synonyms);
};

export const ant = async (word) => {
    let response = await FourtyTwoWordService.relatedWords(word);
    response = response.find(item => item.relationshipType === 'antonym');
    const antonyms = response?.words;
    CmdService.printTitle('#Possible antonyms are:');
    CmdService.printPoints(antonyms);
};

export const ex = async (word) => {
    const response = await FourtyTwoWordService.examples(word);
    const examples = response?.examples.map(item => item.text);
    CmdService.printTitle('#Few examples are:');
    CmdService.printPoints(examples);
};

export const overview = (word) => {
    Promise.all([defn(word), syn(word), ant(word), ex(word)]);
};

export const randomOverview = async () => {
    const response = await FourtyTwoWordService.randomWord();
    const word = response?.word;
    CmdService.printTitle(`Random word: ${word}`);
    overview(word);
};