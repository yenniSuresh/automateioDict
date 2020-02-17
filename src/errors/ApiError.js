export default class ApiError extends Error {
    /**
     * @type {number}
     */
    status;

    /**
     * @type {string}
     */
    message;

    constructor(message, status = null) {
        super();
        this.message = message;
        this.status = status;
    }
}