import App from './modules/App.module.js';
import Routing from './modules/Routing.module.js';

import history from './utils/history.js';

import Home from './pages/home/index.js';
import Calculator from './pages/calculator/index.js';
import NotFound from './pages/not-found/index.js';

(function () {
    const routing = new Routing({
        history,
        container: '#routing',
        routes: [
            {path: '/', component: Home, templateUrl: '/pages/home/index.html'},
            {path: '/calculator', component: Calculator, templateUrl: '/pages/calculator/index.html'},
            {path: '**', component: NotFound, templateUrl: '/pages/not-found/index.html'},
        ]
    });

    const app = new App({
        container: '#app',
        routing
    });

    document.addEventListener('DOMContentLoaded', function () {
        app.init();
    });
})();