// 动态数组

class MyArray {
  constructor(capacity = 10) {
    this.data = new Array(capacity);
    this.size = 0;
  }

  // 获取当前有多少个元素
  getSize() {
    return this.size;
  }

  // 获取数组容量大小
  getCapacity() {
    return this.data.length;
  }

  // 是否为空
  isEmpty() {
    return this.size === 0;
  }

  // 在末尾中添加一个新元素，O(1)
  addLast(e) {
    this.add(this.size, e);
  }

  // 在开头添加一个新元素，O(n)
  addFirst(e) {
    this.add(0, e);
  }

  // 在第idx位置中插入一个新元素e，O(n/2) = O(n)
  add(idx, e) {
    // 满了就扩容
    if (this.size === this.data.length) {
      this.resize(2 * this.data.length);
    }
    if (idx < 0 || idx > this.size) {
      throw "add failed, idx < 0 || idx > this.size";
    }
    for (let i = this.size - 1; i >= idx; i--) {
      this.data[i + 1] = this.data[i];
    }
    this.data[idx] = e;
    this.size++;
  }

  // 获取idx索引位置，可以进行非法的判断, O(1)
  get(idx) {
    if (idx < 0 || idx >= this.size) {
      throw "get failed, idx is illegal";
    }
    return this.data[idx];
  }

  getLast() {
    return this.get(this.size - 1);
  }

  getFirst() {
    return this.get(0);
  }

  // 修改idx索引位置的元素为e, O(1)
  set(idx, e) {
    if (idx < 0 || idx >= this.size) {
      throw "get failed, idx is illegal";
    }
    this.data[idx] = e;
  }

  // 看元素是否包含元素e, O(n)
  contains(e) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) {
        return true;
      }
    }
    return false;
  }

  // 查找元素e的下标, O(n)
  find(e) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) {
        return i;
      }
    }
    return -1;
  }

  // 删除索引为idx的元素，并且返回这个删除的元素, O(n)
  remove(idx) {
    if (idx < 0 || idx >= this.size) {
      throw "add failed, idx < 0 || idx > this.size";
    }
    let val = this.data[idx];
    for (let i = idx; i < this.size; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.size--;

    // 缩小空间
    if (this.size <= this.data.length / 4 && this.data.length / 2 !== 0) {
      this.resize(this.data.length / 2);
    }
    return val;
  }

  // O(n)
  removeFirst() {
    return this.remove(0);
  }

  // O(1)
  removeLast() {
    return this.remove(this.size - 1);
  }

  // O(n)
  removeElement(e) {
    let idx = this.find(e);
    if (idx !== -1) {
      this.remove(idx);
    }
  }

  // 调整数组空间，变大或者缩小，均摊时间复杂度
  resize(newCapacity) {
    newCapacity = Math.floor(newCapacity);
    let newData = new Array(newCapacity);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }

  toString() {
    let str = `Array: size: ${this.size}, capacity: ${this.data.length}\n`;
    str += "[";
    for (let i = 0; i < this.size; i++) {
      let val = this.data[i];
      str += val;
      if (i != this.size - 1) {
        str += ", ";
      }
    }
    str += "]";
    console.log(str);
  }
}

module.exports = MyArray;

// let arr = new MyArray();

// for (let i = 0; i < 10; i++) {
//   arr.addLast(i);
// }
// arr.toString();

// arr.add(1, 100);
// arr.toString();

// arr.addFirst(-1);
// arr.toString();

// arr.remove(2);
// arr.toString();

// arr.removeElement(4);
// arr.toString();

// arr.removeFirst();
// arr.toString();
