export default class InvalidInputError extends Error {
    /**
     * @type {string}
     */
    message;

    constructor(message) {
        super();
        this.message = message;
    }
}