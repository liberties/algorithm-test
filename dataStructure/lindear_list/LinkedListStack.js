
// 链表栈

const LinkedList = require("./LinkedList");
const ArrayStack = require('./ArrayStack');

class LinkedListStack {
    constructor() {
        this.list = new LinkedList();
    }

    getSize(){
      return this.list.getSize();
    }

    isEmpty(){
      return this.list.isEmpty();
    }

    push(e){
      this.list.addFirst(e);
    }

    pop(){
      return this.list.removeFirst();
    }

    peek(){
      return this.list.getFirst();
    }

    toString(){
      let str = "";
      str += `stack: top `;
      str += this.list;
      return str;
    }
}

function testStack(stack) {
  const startTime = Date.now();

  const opCount = 100000;

  for (i = 0; i < opCount; i++) {
    stack.push(Math.random());
  }
  for (i = 0; i < opCount; i++) {
    stack.pop();
  }
  const endTime = Date.now();
  return endTime - startTime;
}

let linkedListStack = new LinkedListStack();
console.log("linkedListStack: " + testStack(linkedListStack));
let arrayStack = new ArrayStack();
console.log("arrayStack: " + testStack(arrayStack));
// 这里发现链表栈和数组栈的速度是差不多的，数组栈主要是数组扩容整个数组拷贝的耗时，而链表栈的主要耗时是新建节点时候的耗时
// 栈的大部分操作都是O(1)的

// let stack = new LinkedListStack();
// for(let i = 0 ; i < 5 ; i++){
//   stack.push(i);
//   console.log(stack.toString());
// }
// stack.pop();
// console.log(stack.toString());
