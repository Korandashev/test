import Observer from './Observer.js';

export default class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const removeIndex = this.observers.findIndex(obs => observer === obs);

        if (removeIndex !== -1) {
            this.observers = this.observers.slice(removeIndex, 1);
        }
    }

    notify(data) {
        if (this.observers.length > 0) {
            this.observers.forEach(observer => {
                if (observer instanceof Observer) {
                    observer.update(data);
                } else {
                    observer(data);
                }
            });
        }
    }
}