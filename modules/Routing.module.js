export default class Routing {
    constructor(config = {}) {
        if (!config.container) throw new Error('Container should be string');

        this.routes = config.routes;
        this.history = config.history;
        this.container = document.querySelector(config.container);

        this.load(window.location.pathname);

        this.history.state.addObserver(({path}) => {
            this.load(path);
        });
    }

    async load(path) {
        const route = this.routes.find(x => x.path === path);

        if (!route) {
            if (this.routes.find(x => x.path === '**')) {
                this.load('**');
            } else {
                throw new Error(`Route "${path}" not found`);
            }
            return;
        }

        const Component = route.component;
        const component = new Component({
            container: this.container
        });

        component.onLoading();

        const response = await fetch(route.templateUrl);
        const html = await response.text();

        component.onLoaded();
        component.setMarkup(html);
        component.render();
        component.onMounted();
    }
}