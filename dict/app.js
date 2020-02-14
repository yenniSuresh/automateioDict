import FourtyTwoWordService from "./services/FourtyTwoWordService";

export const defn = async (word) => {
    const definations = await FourtyTwoWordService.definitions(word);
    console.log(definations);
};