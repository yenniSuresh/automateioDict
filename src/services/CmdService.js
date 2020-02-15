class CmdService {
    /**
     * @param points
     */
    printPoints(points) {
        points.forEach((point, index) => console.log(`${index + 1}) ${point.text}\n`));
    };

    /**
     * @param line
     */
    printLine(line) {
        console.log(`${line}\n`);
    };

    /**
     * @returns {{arg: *, name: *}}
     */
    getAction() {
        const args = process.argv.slice(2);
        return { name: args[0], arg: args[1] };
    };
}

export default new CmdService();