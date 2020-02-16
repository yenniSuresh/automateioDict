import {getRequestedAction, printLine} from './helpers/ConsoleHelper';
import * as actions from './actions';

/**
 * @param arg1
 * @param arg2
 */
const dispatch = ({ arg1, arg2 }) => {
    if (arg2) {
        return actions[arg1](arg2);
    } else if (arg1) {
        return actions[arg1] ? actions[arg1]() : actions.overview(arg1)
    } else {
        return actions.randomOverview();
    }
};

const action = getRequestedAction();

dispatch(action).then(() => {
    printLine("\nThank You :)");
});
