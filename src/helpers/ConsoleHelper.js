import rl from './ReadLineHelper';
import InvalidInputError from '../exceptions/InvalidInputError';

/**
 * @param points
 */
export const printPoints = (points) => {
    if(!Array.isArray(points) || !points.length) {
        return console.log('    No data available')
    }
    points.forEach((point, index) => console.log(`  ${index + 1}) ${point}`));
};

/**
 * @param title
 */
export const printTitle = (title) => {
    if(!title) {
        console.log('No title available')
    }
    console.log(`#${title}`);
};

/**
 * @param line
 */
export const printLine = (line) => {
    if(!line) {
        console.log('No statement available')
    }
    console.log(line);
};

/**
 * @param question
 * @returns {Promise<string>}
 */
export const askInput = (question) => {
    return new Promise((resolve) => {
        rl.resume();
        rl.question(question, (answer) => {
            resolve(answer);
            rl.pause();
        });
    });
};

/**
 * @returns {{arg2: *, arg1: *}}
 */
export const getRequestedAction = () => {
    const args = process.argv.slice(2);
    if (args.length > 2) {
        throw new InvalidInputError('Number of arguments should be <= 2');
    }
    return { arg1: args[0], arg2: args[1] };
};

/**
 * @param error
 */
export const quitConsole = (error = null) => {
    let message = '';
    if (error) {
        message = `${error.message}\nPlease try again.`;
    }
    message += '\nThank You :)';
    printLine(message);
};