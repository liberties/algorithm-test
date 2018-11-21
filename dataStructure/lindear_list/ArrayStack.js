// 数组栈
// 先进后出

const MyArray = require("./MyArray");

class ArrayStack {
  constructor(capacity) {
    this.array = new MyArray(capacity);
  }

  getSize() {
    return this.array.getSize();
  }

  // 是否为空
  isEmpty() {
    return this.array.isEmpty();
  }

  // 获取栈的容积大小
  getCapacity() {
    return this.array.getCapacity();
  }

  // 入栈
  push(e) {
    this.array.addLast(e);
  }

  // 出栈
  pop() {
    return this.array.removeLast();
  }

  // 查看栈顶元素
  peek() {
    return this.array.getLast();
  }

  toString() {
    let str = "Stack: [";
    for (let i = 0; i < this.array.getSize(); i++) {
      str += this.array.get(i);
      if (i !== this.array.getSize() - 1) {
        str += ", ";
      }
    }
    str += "] bottom -> top";
    return str;
  }
}

module.exports = ArrayStack;

// let stack = new ArrayStack();
// for(let i = 0 ; i < 5 ; i++){
//   stack.push(i);
//   stack.toString();
// }
// stack.pop();
// stack.toString();
