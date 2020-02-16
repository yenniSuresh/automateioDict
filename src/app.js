import { getRequestedAction, quitConsole } from './helpers/ConsoleHelper';
import * as actions from './actions';

//console.log(process.env);

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

try {
    const action = getRequestedAction();
    dispatch(action)
        .then(() => quitConsole())
        .catch((error) => quitConsole(error));
} catch (error) {
    quitConsole(error);
}

