

// 数组表示线段树

class SegmentTree{
    constructor(arr, merge){
        this.merge = merge;
        this.data = new Array(arr.length);
        for(let i = 0 ; i < arr.length ; i++){
            this.data[i] = arr[i];
        }

        this.tree = new Array(4 * arr.length);
        this.buildSegmentTree(0, 0, this.data.length - 1)
    }

    // 在treeIndex的位置创建表示区间[l-r]的线段树
    buildSegmentTree(treeIndex, l, r){
        if(l === r){
            this.tree[treeIndex] = this.data[l];
            return ;
        }
        let leftTreeIndex = this.leftChild(treeIndex);
        let rightTreeIndex = this.rightChild(treeIndex);

        let mid = Math.floor(l + (r - l) / 2); // 防止数据过大l+r/2溢出；
        this.buildSegmentTree(leftTreeIndex, l, mid);
        this.buildSegmentTree(rightTreeIndex, mid + 1, r);

        // 这里把线段的计算过程抽离出去，如果这里写死a+b的话，那么就只能做加法了，如果a和b是对象，就崩了。
        tree[treeIndex] = this.merge(tree[leftTreeIndex], tree[rightTreeIndex])
    }

    getSize(){
        return this.data.length;
    }

    get(index){
        if(index < 0 || index >= this.data.length){
            throw "index is illegal";
        }
        return this.data[index];
    }

    // 左孩子节点的索引
    leftChild(idx){
        return 2 * idx + 1;
    }

    // 右孩子节点的索引
    rightChild(idx){
        return 2 * idx + 2;
    }
}
