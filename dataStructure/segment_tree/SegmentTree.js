// 数组表示线段树
// 表示区间

class SegmentTree {
    constructor(arr, merge) {
        this.merge = merge;
        this.data = new Array(arr.length);
        for (let i = 0; i < arr.length; i++) {
            this.data[i] = arr[i];
        }

        this.tree = new Array(4 * arr.length);
        this.buildSegmentTree(0, 0, this.data.length - 1);
    }

    // 在treeIndex的位置创建表示区间[l-r]的线段树
    buildSegmentTree(treeIndex, l, r) {
        if (l === r) {
            this.tree[treeIndex] = this.data[l];
            return;
        }
        let leftTreeIndex = this.leftChild(treeIndex);
        let rightTreeIndex = this.rightChild(treeIndex);

        let mid = Math.floor(l + (r - l) / 2); // 防止数据过大l+r/2溢出；
        this.buildSegmentTree(leftTreeIndex, l, mid);
        this.buildSegmentTree(rightTreeIndex, mid + 1, r);

        // 这里把线段的计算过程抽离出去，如果这里写死a+b的话，那么就只能做加法了，如果a和b是对象，就崩了。
        this.tree[treeIndex] = this.merge(
            this.tree[leftTreeIndex],
            this.tree[rightTreeIndex]
        );
    }

    getSize() {
        return this.data.length;
    }

    get(index) {
        if (index < 0 || index >= this.data.length) {
            throw "index is illegal";
        }
        return this.data[index];
    }

    // 左孩子节点的索引
    leftChild(idx) {
        return 2 * idx + 1;
    }

    // 右孩子节点的索引
    rightChild(idx) {
        return 2 * idx + 2;
    }

    // 返回区间[queryL, queryR]的值 O(logn)
    query(queryL, queryR) {
        if (
            queryL < 0 ||
            queryL >= this.data.length ||
            queryR < 0 ||
            queryR >= this.data.length ||
            queryL > queryR
        ) {
            throw "Index is illegal";
        }
        return this._query(0, 0, this.data.length - 1, queryL, queryR);
    }

    // 在以treeIndex为根的线段树中[l...r]的范围里，搜索区间[queryL...queryR]的值
    _query(treeIndex, l, r, queryL, queryR) {
        if (l === queryL && r === queryR) {
            return this.tree[treeIndex];
        }

        const leftTreeIndex = this.leftChild(treeIndex);
        const rightTreeIndex = this.rightChild(treeIndex);
        const mid = Math.floor(l + (r - l) / 2); // 防止数据过大l+r/2溢出；

        // 如果要查询的内容全部在左边
        if (queryR <= mid) {
            return this._query(leftTreeIndex, l, mid, queryL, queryR);
        } else if (queryL >= mid + 1) {
            // 如果要查询的内容全部在右边
            return this._query(rightTreeIndex, mid + 1, r, queryL, queryR);
        }

        // 如果查询的内容左边有一部分，右边有一部分，那么分别求值，然后merge
        const leftResult = this._query(leftTreeIndex, l, mid, queryL, mid);
        const rightResult = this._query(
            rightTreeIndex,
            mid + 1,
            r,
            mid + 1,
            queryR
        );
        return this.merge(leftResult, rightResult);
    }

    // 将index位置的值，更新为e
    set(index, e) {
        if (index < this.data.length || index >= this.data.length) {
            throw "index is illegal";
        }
        this.data[index] = e;
        this._set(0, 0, this.data.length - 1, index, e);
    }

    _set(treeIndex, l, r, index, e) {
        if (treeIndex === index) {
            this.tree[treeIndex] = e;
            return ;
        }

        const leftTreeIndex = this.leftChild(treeIndex);
        const rightTreeIndex = this.rightChild(treeIndex);
        const mid = Math.floor(l + (r - l) / 2); // 防止数据过大l+r/2溢出；

        if (index >= mid + 1) {
            this._set(rightTreeIndex, mid + 1, r, index, e);
        } else {
            this._set(leftTreeIndex, l, mid, index, e);
        }
        this.tree[treeIndex] = this.merge(
            this.tree[leftTreeIndex],
            this.tree[rightTreeIndex]
        );
    }

    toString() {
        let res = "";
        res += "[";
        for (let i = 0; i < this.tree.length; i++) {
            if (this.tree[i] !== undefined) {
                res += this.tree[i];
            } else {
                res += "null";
            }

            if (i !== this.tree.length - 1) {
                res += ", ";
            }
        }
        res += "]";
        return res;
    }
}

module.exports = SegmentTree;

const nums = [-2, 0, 3, -5, 2, -1];
const merge = (a, b) => {
    return a + b;
};
let st = new SegmentTree(nums, merge);
console.log(st.toString());
console.log(st.query(0, 2));
console.log(st.query(2, 5));
console.log(st.query(0, 5));
