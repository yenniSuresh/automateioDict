class CmdService {
    /**
     * @param points
     */
    printPoints(points) {
        if(!Array.isArray(points) || !points.length) {
            console.log('No data available\n')
        }
        points.forEach((point, index) => console.log(`  ${index + 1}) ${point}\n`));
    };

    /**
     * @param line
     */
    printLine(line) {
        if(!line) {
            console.log('No data available\n')
        }
        console.log(`${line}\n`);
    };

    /**
     * @returns {{arg2: *, arg1: *}}
     */
    getAction() {
        const args = process.argv.slice(2);
        return { arg1: args[0], arg2: args[1] };
    };
}

export default new CmdService();