import Dictionary from './Dictionary';

/**
 * @param word
 */
export const defn = (word) => {
    const dict = new Dictionary(word);
    return dict.showDefinition();
};

/**
 * @param word
 */
export const syn = (word) => {
    const dict = new Dictionary(word);
    return dict.showSynonyms();
};

/**
 * @param word
 */
export const ant = (word) => {
    const dict = new Dictionary(word);
    return dict.showAntonyms();
};

/**
 * @param word
 */
export const ex = async (word) => {
    const dict = new Dictionary(word);
    return dict.showExamples();
};

/**
 * @param word
 */
export const overview = async (word) => {
    const dict = new Dictionary(word);
    return dict.showOverview();
};

export const randomOverview = async () => {
    const dict = new Dictionary();
    return dict.showRandomOverview()
};

export const play = async () => {
    const dict = new Dictionary();
    return dict.playGuessGame();
};

