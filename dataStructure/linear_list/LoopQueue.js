// 循环队列，出队O(1)

class LoopQueue {
  constructor(capacity = 10) {
    this.data = new Array(capacity + 1);
    this.front = 0; // 队首下标
    this.tail = 0; // 队尾下标
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.front === this.tail;
  }

  getCapacity() {
    return this.data.length - 1;
  }

  // 入队
  enqueue(e) {
    if ((this.tail + 1) % this.data.length === this.front) {
      this.resize(this.getCapacity() * 2);
    }
    this.data[this.tail] = e;
    this.tail = (this.tail + 1) % this.data.length;
    this.size++;
  }

  // 调整容积大小
  resize(capacity) {
    capacity = Math.floor(capacity);
    let newData = new Array(capacity + 1);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[(i + this.front) % this.data.length];
    }
    this.data = newData;
    this.front = 0;
    this.tail = this.size;
  }

  // 出队
  dequeue() {
    if (this.isEmpty()) {
      throw "cannot dequeue from an empty queue";
    }

    let ret = this.data[this.front];
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.data.length;
    this.size--;
    if (this.size <= this.getCapacity() / 4 && this.getCapacity() / 2 > 0) {
      this.resize(this.getCapacity() / 2);
    }
    return ret;
  }

  // 获取队首元素
  getFront() {
    if (this.isEmpty()) {
      throw " empty ";
    }
    return this.data[this.front];
  }

  toString() {
    let str = `LoopQueue: size = ${
      this.size
    } , capacity = ${this.getCapacity()} [`;
    for (let i = this.front; i !== this.tail; i = (i + 1) % this.data.length) {
      str += this.data[i];
      if ((i + 1) % this.data.length !== this.tail) {
        str += ", ";
      }
    }
    str += "] front -> tail";
    return str;
  }
}

function testQueue(q) {
  const startTime = Date.now();

  const opCount = 20000;

  for (i = 0; i < opCount; i++) {
    q.enqueue(Math.random());
  }
  for (i = 0; i < opCount; i++) {
    q.dequeue();
  }
  const endTime = Date.now();
  return endTime - startTime;
}

const ArrayQueue = require("./ArrayQueue");
const LinkedListQueue = require('./LinkedListQueue');

let loopQueue = new LoopQueue();
console.log("loopQueue: " + testQueue(loopQueue));
let linkedListQueue = new LinkedListQueue();
console.log("linkedListQueue: " + testQueue(linkedListQueue));
let arrayQueue = new ArrayQueue();
console.log("arrayQueue: " + testQueue(arrayQueue));
// 这里的性能差距应该是在于数组队列出队时候的所有队列元素的前移，链表队列和循环队列差不太多，// 这里的性能差距应该是在于出队时候的所有队列元素的前移，其实js的里面对于动态数组的重新赋值，好像还好？起码在链表栈中没看出什么明显的区别

// for (let i = 0; i < 10; i++) {
//   queue.enqueue(i);
//   queue.toString();
//   if (i % 3 === 2) {
//     queue.dequeue();
//     queue.toString();
//   }
// }
