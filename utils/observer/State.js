import Subject from './Subject.js';

export default class State extends Subject {
    constructor(initialState = {}) {
        super();
        this.state = initialState;
    }

    update(data = {}) {
        this.state = Object.assign(this.state, data);
        this.notify(this.state);
    }

    get() {
        return this.state;
    }
}