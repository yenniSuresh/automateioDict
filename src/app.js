import CmdService from "./services/CmdService";
import * as actions from './actions';

const dispatcher = ({ arg1, arg2 }) => {
    actions[arg1] ? actions[arg1](arg2) : actions.overview(arg1);
};

const action = CmdService.getAction();

dispatcher(action);
