import Dictionary from './Dictionary';

/**
 * @param word
 */
export const defn = (word) => {
    const dict = new Dictionary(word);
    dict.showDefinition();
};

/**
 * @param word
 */
export const syn = (word) => {
    const dict = new Dictionary(word);
    dict.showSynonyms();
};

/**
 * @param word
 */
export const ant = (word) => {
    const dict = new Dictionary(word);
    dict.showAntonyms();
};

/**
 * @param word
 */
export const ex = (word) => {
    const dict = new Dictionary(word);
    dict.showExamples();
};

/**
 * @param word
 */
export const overview = (word) => {
    const dict = new Dictionary(word);
    dict.showOverview();
};

export const randomOverview = () => {
    const dict = new Dictionary();
    dict.showRandomOverview()
};

export const play = () => {
    const dict = new Dictionary();
    dict.playGuessGame();
};

