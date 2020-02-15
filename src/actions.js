import FourtyTwoWordService from "./services/FourtyTwoWordService";
import CmdService from "./services/CmdService";

export const defn = async (word) => {
    const response = await FourtyTwoWordService.definitions(word);
    CmdService.printLine('Possible definitions are:');
    CmdService.printPoints(response);
};