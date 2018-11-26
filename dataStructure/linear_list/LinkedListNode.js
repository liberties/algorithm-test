class LinkedListNode {
    constructor(e, next = null) {
        this.e = e;
        this.next = next;
    }

    toString() {
        return this.e.toString();
    }
}

module.exports = LinkedListNode;
