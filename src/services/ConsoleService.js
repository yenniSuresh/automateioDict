import rl from '../helpers/ReadLineHelper';

class ConsoleService {
    /**
     * @param points
     */
    printPoints(points) {
        if(!Array.isArray(points) || !points.length) {
            return console.log('    No data available')
        }
        points.forEach((point, index) => console.log(`  ${index + 1}) ${point}`));
    };

    /**
     * @param title
     */
    printTitle(title) {
        if(!title) {
            console.log('No title available')
        }
        console.log(`#${title}`);
    };

    /**
     * @param line
     */
    printLine(line) {
        if(!line) {
            console.log('No statement available')
        }
        console.log(line);
    }

    /**
     * @param question
     * @returns {Promise<unknown>}
     */
    askInput(question) {
        return new Promise((resolve) => {
            rl.resume();
            rl.question(question, (answer) => {
                resolve(answer);
                rl.pause();
            });
        });
    }

    /**
     * @returns {{arg2: *, arg1: *}}
     */
    getAction() {
        const args = process.argv.slice(2);
        return { arg1: args[0], arg2: args[1] };
    };
}

export default new ConsoleService();