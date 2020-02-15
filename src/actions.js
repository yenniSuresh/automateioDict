import FourtyTwoWordService from "./services/FourtyTwoWordService";
import CmdService from "./services/CmdService";

export const defn = async (word) => {
    let response = await FourtyTwoWordService.definitions(word);
    response = response?.map(item => item.text);
    CmdService.printLine('#Possible definitions are:');
    CmdService.printPoints(response);
};

export const syn = async (word) => {
    let response = await FourtyTwoWordService.relatedWords(word);
    response = response.find(item => item.relationshipType === 'synonym');
    const synonyms = response?.words;
    CmdService.printLine('#Possible synonyms are:');
    CmdService.printPoints(synonyms);
};

export const ant = async (word) => {
    let response = await FourtyTwoWordService.relatedWords(word);
    response = response.find(item => item.relationshipType === 'antonym');
    const antonyms = response?.words;
    CmdService.printLine('#Possible antonyms are:');
    CmdService.printPoints(antonyms);
};

export const ex = async (word) => {
    let response = await FourtyTwoWordService.examples(word);
    const examples = response?.examples.map(item => item.text);
    CmdService.printLine('#Few examples are:');
    CmdService.printPoints(examples);
};

export const overview = (word) => {
    Promise.all([defn(word), syn(word), ant(word), ex(word)]);
};