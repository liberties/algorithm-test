// 队列

var MyArray = require('./MyArray');

class ArrayQueue {
  constructor(capacity) {
    this.array = new MyArray(capacity);
  }

  getSize(){
    return this.array.getSize();
  }

  isEmpty(){
    return this.array.isEmpty();
  }

  getCapacity(){
    return this.array.getCapacity();
  }

  // 入队
  enqueue(e){
    this.array.addLast(e);
  }

  // 出队
  dequeue(){
    return this.array.removeFirst();
  }

  // 获取队首元素
  getFront(){
    return this.array.getFirst();
  }

  toString(){
    let str = "Queue: [";
    for (let i = 0; i < this.array.getSize(); i++) {
      str += this.array.get(i);
      if (i !== this.array.getSize() - 1) {
        str += ", ";
      }
    }
    str += "] front -> tail";
    return str;
  }
}

module.exports = ArrayQueue;

// let queue = new ArrayQueue();
// for(let i = 0 ; i< 10 ; i++){
//   queue.enqueue(i);
//   queue.toString();
//   if(i % 3 === 2){
//     queue.dequeue();
//     queue.toString();
//   }
// }
