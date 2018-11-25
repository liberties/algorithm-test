const MyArray = require("../lindear_list/MyArray");

/**
 * 用数组描述最大堆
 * parent(i) = (i - 1)/2
 * left child (i) = 2 * i + 1
 * right child (i) = 2 * i + 2
 */

class MaxHeap {
    constructor(capacity) {
        if (Array.isArray(capacity)) {
            const arr = capacity;
            this.data = new MyArray(arr);
            this.heapify();
        } else {
            this.data = new MyArray(capacity);
        }
    }

    getSize() {
        return this.data.getSize();
    }

    isEmpty() {
        return this.data.isEmpty();
    }

    // 返回完全二叉树的数组表示中，一个索引所表示的元素的父亲节点的索引
    parent(idx) {
        if (idx === 0) {
            throw "index-0 doesn't have parent.";
        }
        return Math.floor((idx - 1) / 2);
    }

    // 返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
    leftChild(idx) {
        return idx * 2 + 1;
    }

    // 返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
    rightChild(idx) {
        return idx * 2 + 2;
    }

    // 最大堆中添加元素，直接在末尾添加，然后处理上浮操作
    // O(logn)
    add(e) {
        this.data.addLast(e);
        const lastIdx = this.data.getSize() - 1;
        this.siftUp(lastIdx);
    }

    // 上浮，在最大堆中添加元素，添加的元素为了满足最大堆的特性：父亲节点比孩子节点大，会上浮与自己的父亲节点进行比较，如果比父亲节点大，两者就会交换位置
    siftUp(idx) {
        while (idx > 0) {
            const parentIdx = this.parent(idx);
            const parentValue = this.data.get(parentIdx);
            const childValue = this.data.get(idx);
            if (this.compare(parentValue, childValue) > 0) {
                break;
            }
            this.data.swap(parentIdx, idx);
            idx = parentIdx;
        }
    }

    // 查看堆中的最大元素的值
    findMax() {
        if (this.data.getSize() === 0) {
            throw "heap is empty";
        }
        return this.data.getFirst();
    }

    // 下沉，取出最大堆中最大的元素，会把堆中末尾和最大的元素交换位置，然后删除末尾元素
    // O(logn)
    extractMax() {
        const ret = this.findMax();
        this.data.swap(0, this.data.getSize() - 1);
        this.data.removeLast();
        this.siftDown(0);
        return ret;
    }

    // 下沉，取出最大堆中最大的元素，会把堆中末尾和最大的元素交换位置，然后删除末尾元素，元素会与自己的孩子节点进行比较，如果比孩子节点小，就会跟左右孩子中最大的一个交换位置
    siftDown(idx) {
        while (true) {
            let leftIdx = this.leftChild(idx);
            if (leftIdx < this.data.getSize()) {
                let childMaxValue = this.data.get(leftIdx),
                    childMaxIdx = leftIdx;

                const rightIdx = this.rightChild(idx);
                if (
                    rightIdx < this.data.getSize() &&
                    this.compare(this.data.get(rightIdx), childMaxValue) > 0
                ) {
                    childMaxIdx = rightIdx;
                    childMaxValue = this.data.get(rightIdx);
                }
                const value = this.data.get(idx);
                if (this.compare(childMaxValue, value) > 0) {
                    this.data.swap(childMaxIdx, idx);
                    idx = childMaxIdx;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }

    // 取出堆中的最大元素，并且替换成元素e
    replace(e) {
        const ret = this.findMax();
        this.data.set(0, e);
        this.siftDown(0);
        return ret;
    }

    // 将任意数组整理成堆的形状
    heapify() {
        const last = this.parent(this.data.getSize() - 1);
        for (let i = last; i >= 0; i--) {
            this.siftDown(i);
        }
    }

    // 比较方法
    compare(a1, a2) {
        // 普通类型的比较，一般是数字
        if (typeof a1 !== "object" && typeof a2 !== "object") {
            if (a1 > a2) {
                return 1;
            } else if (a2 > a1) {
                return -1;
            } else {
                return 0;
            }
        } else {
            return a1.compareTo(a2);
        }
    }
}

module.exports = MaxHeap;

function testHeap(testData, isHeapify) {
    const start = Date.now();
    let heap;
    if (isHeapify) {
        heap = new MaxHeap(testData);
    } else {
        heap = new MaxHeap();
        for (let num of testData) {
            heap.add(num);
        }
    }

    let arr = [];
    for (let i = 0; i < testData.length; i++) {
        arr[i] = heap.extractMax();
    }

    for (let i = 1; i < testData.length; i++) {
        if (arr[i - 1] < arr[i]) {
            throw "error";
        }
    }
    console.log("success");
    const end = Date.now();
    console.log(`isHeapify: ${isHeapify}:` + (end - start));
}

const getRandomInt = (function() {
    let hash = {};
    return function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let randomNum;
        do {
            randomNum = Math.floor(Math.random() * (max - min)) + min;
        } while (hash[randomNum]);
        hash[randomNum] = 1;
        return randomNum;
    };
})();

// let heap = new MaxHeap();
let testData = [];
const n = 10000;
for (let i = 0; i < n; i++) {
    const randomNum = getRandomInt(n, 0);
    testData.push(randomNum);
}

// testHeap(testData, false);
// testHeap(testData, true);

// let heap = new MaxHeap(testData);
// let arr = [];
// for (let i = 0; i < n; i++) {
//     arr[i] = heap.extractMax();
// }

// for (let i = 1; i < n; i++) {
//     if (arr[i - 1] < arr[i]) {
//         throw "error";
//     }
// }
// console.log("success");
