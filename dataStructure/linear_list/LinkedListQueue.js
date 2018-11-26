const Node = require("./LinkedListNode");

// 链表队列，不受固定的存储空间限制，出队为O(1)

class LinkedListQueue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    enqueue(e) {
        if (this.tail === null) {
            this.tail = new Node(e);
            this.head = this.tail;
        } else {
            this.tail.next = new Node(e);
            this.tail = this.tail.next;
        }
        this.size++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw "cannot dequeue from an empty queue";
        }
        let retNode = this.head;
        this.head = this.head.next;
        this.size--;
        retNode.next = null;
        // 如果只有一个节点的出队，head为空，这个时候要手动矫正一下tail的位置
        if (this.head === null) {
            this.tail = null;
        }
        return retNode;
    }

    getFront() {
        if (this.isEmpty()) {
            throw "queue is empty";
        }
        return this.head.e;
    }

    toString() {
        let str = "Queue: front [";
        let cur = this.head;
        while(cur !== null){
            str += cur + "->";
            cur = cur.next;
        }
        str += "null] tail";
        return str;
    }
}

module.exports = LinkedListQueue;

// let queue = new LinkedListQueue();
// for(let i = 0 ; i< 10 ; i++){
//   queue.enqueue(i);
//   console.log(queue.toString());
//   if(i % 3 === 2){
//     queue.dequeue();
//     console.log(queue.toString());
//   }
// }
