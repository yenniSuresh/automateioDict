import CmdService from './services/ConsoleService';
import * as actions from './actions';

/**
 * @param arg1
 * @param arg2
 */
const dispatch = ({ arg1, arg2 }) => {
    if (arg2) {
        actions[arg1](arg2);
    } else if (arg1) {
        actions[arg1] ? actions[arg1]() : actions.overview(arg1)
    } else {
        actions.randomOverview();
    }
};

const action = CmdService.getAction();

dispatch(action);
