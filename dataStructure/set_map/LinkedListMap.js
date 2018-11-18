
// 基于链表实现的map

class Node {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }

    toString() {
        return this.key.toString() + " : " + this.value.toString();
    }
}

class LinkedListMap {
    constructor() {
        this.dummyHead = new Node();
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    getNode(key) {
        let cur = this.dummyHead.next;
        while (cur !== null) {
            if (cur.key === key) {
                return cur;
            }
            cur = cur.next;
        }
        return null;
    }

    contains(key) {
        return this.getNode(key) !== null;
    }

    get(key) {
        let node = this.getNode(key);
        return node === null ? null : node.value;
    }

    add(key, value) {
        let node = this.getNode(key);
        if (node === null) {
            this.dummyHead.next = new Node(key, value, this.dummyHead.next);
            this.size++;
        } else {
            node.value = value;
        }
    }

    remove(key) {
        let prev = this.dummyHead;
        while (prev.next !== null && prev.next.key !== key) {
            prev = prev.next;
        }
        if (prev.next !== null) {
            let cur = prev.next;
            prev.next.next = cur.next;
            cur.next = null;
            this.size--;
            return cur.value;
        }
        return null;
    }
}
