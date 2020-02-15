import FourtyTwoWordService from "./services/FourtyTwoWordService";

export const defn = (word) => {
    return FourtyTwoWordService.definitions(word);
};