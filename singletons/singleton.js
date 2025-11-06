class Foo {
    constructor() {
        this.data = [];
    }

    add(item) {
        this.data.push(item);
    }

    doThing() {
        console.log(this.data);
    }
}

const inst = new Foo();

module.exports = inst;