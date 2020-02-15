import CmdService from "./services/CmdService";
import * as actions from './actions';

const dispatcher = ({ name, arg }) => {
    actions[name](arg);
};

const action = CmdService.getAction();

dispatcher(action);
