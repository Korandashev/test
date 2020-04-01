import State from './observer/State.js';

export class History {
    constructor() {
        this.state = new State({
            path: window.location.pathname,
            data: {},
            title: document.title
        });
    }

    push({path = '/', data = {}, title = ''}) {
        window.history.pushState(data, title, path);
        this.state.update({path, data, title});
    }
}

const history = new History();

export default history;