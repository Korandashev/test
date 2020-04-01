import history from '../../utils/history.js';

export default class Page {
    constructor(config = {}) {
        if (!config.container) throw new Error('Parent container is not defined');
        this.container = config.container;

        this.markup = '';
        this.state = {};
    }

    setState(state) {
        this.state = state;
        this.render();
        this.onMounted();
    }

    setMarkup(markup = '') {
        this.markup = markup;
    }

    onLoading() {
    }

    onLoaded() {
    }

    onMounted() {
    }

    generateMarkup() {
        return this.markup.replace(/{(\w*)}/g, (m, key) => this.state.hasOwnProperty(key) ? this.state[key] : '');
    }

    render() {
        this.container.innerHTML = this.generateMarkup();

        const links = [...document.querySelectorAll('a')];
        const bindElements = [...document.querySelectorAll('[bind-on-click]')];

        links.forEach(function (element) {
            element.addEventListener('click', function (event) {
                event.preventDefault();
                history.push({path: element.getAttribute('href')});
            });
        });

        bindElements.forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                const expression = element.getAttribute('bind-on-click');
                let [methodName, args] = expression.match(/(\w*)\((.*)\)/).slice(1);
                args = args && args.split(',').map(x => {
                    const str = x.trim().match(/^['"`](.*)['"`]$/);
                    return str && str[1] ? str[1] : Number(x);
                });
                if (this[methodName]) this[methodName](...args);
            });
        });
    }
}