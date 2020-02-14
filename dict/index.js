import * as actions from './app';

const args = process.argv.slice(2);

actions[args[0]](args[1]);
