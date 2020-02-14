export default  class BaseService {
    /**
     * @type {BaseResource}
     */
    resource;

    constructor(resource) {
        this.resource = resource;
    }
}