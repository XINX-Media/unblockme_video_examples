class PriorityQueue {
    constructor() {
        this.map = {};
        this.keyList = [];
        this.count = 0;
    }

    enqueue(value, priority) {
        if (this.map[priority]) {
            this.map[priority].push(value);
        } else {
            this.map[priority] = [value];

            this.keyList = Object.keys(this.map).map((str) => {
                return parseFloat(str, 10);
            });
            this.keyList.sort((a, b) => {
                return a-b;
            });
        }
        this.count ++;
    }

    dequeue() {
        if (this.keyList.length === 0) {
            return null;
        }

        const lowestPriority = this.keyList[0];
        const element = this.map[lowestPriority].shift();
        if (this.map[lowestPriority].length === 0) {
            delete this.map[lowestPriority];
            this.keyList.shift();
        }

        this.count --;

        return element;
    }

    contains(compareFn) {
        for (const values of Object.values(this.map)) {
            for (const value of values) {
                if (compareFn(value)) {
                    return true;
                }
            }
        }

        return false;
    }

    length() {
        return this.count;
    }

    print() {
        console.log(this.map, this.keyList);
    }
}