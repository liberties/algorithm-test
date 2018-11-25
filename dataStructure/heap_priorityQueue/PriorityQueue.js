
const MaxHeap = require('./MaxHeap');

// 最大堆实现优先队列
class PriorityQueue{
    constructor(){
        this.maxHeap = new MaxHeap();
    }

    getSize(){
        return this.maxHeap.getSize();
    }

    isEmpty(){
        return this.maxHeap.isEmpty();
    }

    getFront(){
        return this.maxHeap.findMax();
    }

    // O(logn)
    enqueue(e){
        this.maxHeap.add(e);
    }

    // O(logn)
    dequeue(){
        return this.maxHeap.extractMax();
    }
}

module.exports = PriorityQueue;
