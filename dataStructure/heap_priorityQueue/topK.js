const BSTMap = require("../set_map/BSTMap");
const PriorityQueue = require("./PriorityQueue");


// 可以把compare做一个专门的比较器，从外面传入，这样优先队列就可以根据这个比较器来确定优先级，比如一个字符串你不希望根据字典序比较，而是希望根据字符串长度比较
class Freq {
    constructor(e, freq) {
        this.e = e; // 值
        this.freq = freq; // 频次
    }

    compareTo(another) {
        if (this.freq < another.freq) {
            return 1;
        } else if (this.freq > another.freq) {
            return -1;
        } else {
            return 0;
        }
    }
}

function topKFrequent(nums, k) {
    let map = new BSTMap();
    for (let num of nums) {
        if (map.contains(num)) {
            map.set(num, map.get(num) + 1);
        } else {
            map.add(num, 1);
        }
    }
    let pq = new PriorityQueue();
    const keys = map.keySet();
    for(let key of keys){
        if(pq.getSize() < k){
            pq.enqueue(new Freq(key, map.get(key)));
        } else if(map.get(key) > pq.getFront().freq) {
            pq.dequeue();
            pq.enqueue(new Freq(key, map.get(key)));
        }
    }
    let res = [];
    while(!pq.isEmpty()){
        res.push(pq.dequeue().e);
    }
    return res;
}

const nums = [2,1,3,4,56,2,8,9,32,54,76,76,2,1,3,76];
const res = topKFrequent(nums, 3)
console.log(res);
