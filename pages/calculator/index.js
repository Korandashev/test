import Page from '../page/index.js';

export default class Calculator extends Page {
    constructor(params) {
        super(params);

        this.state = {
            counter: 0
        };
    }

    add(n = 1) {
        this.setState({
            ...this.state,
            counter: this.state.counter + n
        });
    }
}