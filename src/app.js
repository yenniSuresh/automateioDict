import * as actions from './actions';

const args = process.argv.slice(2);

actions[args[0]](args[1]).then(response => console.log("Answer = ", response));
