import CmdService from "./services/CmdService";
import * as actions from './actions';

const dispatcher = ({ arg1, arg2 }) => {
    if (arg2) {
        actions[arg1](arg2);
    } else if (arg1) {
        actions.overview(arg1)
    } else {
        actions.randomOverview();
    }
};

const action = CmdService.getAction();

dispatcher(action);
