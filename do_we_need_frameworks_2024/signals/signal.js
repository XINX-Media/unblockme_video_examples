class Signal {
    constructor(initial) {
        this.handlers = [];
        this.value = initial;
    }

    observe(handler) {
        this.handlers.push(handler);
    }

    change(value) {
        this.value = value;
        for (const handler of this.handlers) {
            handler(value);
        }
    }

    getValue() {
        return this.value;
    }
}