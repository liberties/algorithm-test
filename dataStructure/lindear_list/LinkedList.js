// 链表

const Node = require("./LinkedListNode");

class LinkedList {
    constructor() {
        // 虚拟头结点
        this.dummyHead = new Node(null);
        this.size = 0;
    }

    // 返回链表元素个数
    getSize() {
        return this.size;
    }

    // 链表是否为空
    isEmpty() {
        return this.size === 0;
    }

    // 在链表头添加元素
    addFirst(e) {
        this.add(0, e);
    }

    // 在链表末尾添加元素e
    addLast(e) {
        this.add(this.size, e);
    }

    // 在链表的位置添加新的元素e
    add(idx, e) {
        if (idx < 0 || idx > this.size) {
            throw "add failed, illegal idx";
        }

        let prev = this.dummyHead;
        for (let i = 0; i < idx; i++) {
            prev = prev.next;
        }
        prev.next = new Node(e, prev.next);
        this.size++;
    }

    // 在链表的位置处，删除元素
    remove(idx) {
        if (idx < 0 || idx >= this.size) {
            throw "remove failed, illegal idx";
        }

        let prev = this.dummyHead;
        for (let i = 0; i < idx; i++) {
            prev = prev.next;
        }
        let cur = prev.next;
        prev.next = cur.next;
        cur.next = null;
        this.size--;
        return cur.e;
    }

    removeFirst() {
        return this.remove(0);
    }

    removeLast() {
        return this.remove(this.size - 1);
    }

    removeElement(e){
        let prev =  this.dummyHead;
        while(prev && prev.e !== e){
            prev = prev.next;
        }
        let element = undefined
        if(prev){
            element = prev.next;
            prev.next = element.next;
            element.next = null;
            this.size--
        }
        return element;
    }

    // 获得链表中第idx个位置的元素
    get(idx) {
        if (idx < 0 || idx >= this.size) {
            throw "get failed, illegal idx";
        }
        let cur = this.dummyHead.next;
        for (let i = 0; i < idx; i++) {
            cur = cur.next;
        }
        return cur.e;
    }

    // 获取链表第一个元素
    getFirst() {
        return this.get(0);
    }

    // 获取链表最后一个元素
    getLast() {
        return this.get(this.size - 1);
    }

    // 修改链表中第idx位置的元素为e
    set(idx, e) {
        if (idx < 0 || idx >= this.size) {
            throw "set failed, illegal idx";
        }

        let cur = this.dummyHead.next;
        for (let i = 0; i < idx; i++) {
            cur = cur.next;
        }
        cur.e = e;
    }

    // 查找链表中是否有元素e
    contains(e) {
        let cur = this.dummyHead.next;
        while (cur !== null) {
            if (cur.e === e) {
                return true;
            }
            cur = cur.next;
        }
        return false;
    }

    toString() {
        let str = "";

        let cur = this.dummyHead.next;
        while (cur !== null) {
            str += `${cur}->`;
            cur = cur.next;
        }
        str += "null";
        return str;
    }
}

module.exports = LinkedList;

// let linkedList = new LinkedList();
// for (let i = 0; i < 5; i++) {
//   linkedList.addFirst(i);
// }
// linkedList.add(2, 666);
// linkedList.toString();

// linkedList.remove(2);
// linkedList.toString();

// linkedList.removeFirst();
// linkedList.toString();

// linkedList.removeLast();
// linkedList.toString();
