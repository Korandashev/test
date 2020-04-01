export default class App {
    constructor(config = {}) {
        const defaultConfig = {
            container: null,
            routing: null
        };
        this.config = Object.assign({}, defaultConfig, config);
    }

    init() {
        const {container} = this.config;
        if (!container) throw new Error('Container should be a string');
    }
}