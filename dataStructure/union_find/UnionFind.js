

// 并查集，森林，孩子指向父亲

class UnionFind{
    constructor(size){
        this.parent = new Array(size)
        this.rank = new Array(size)

        for(let i = 0; i < size; i++){
            this.parent[i] = i;
            this.rank[i] = 1;
        }
    }

    getSize(){
        return this.parent.length
    }

    // 查找元素P所对应的集合编号
    // O(h)复杂度，h为树的高度
    find(p){
        if(p < 0 && p >= this.id.length){
            throw new Error("p is out of bound.");
        }
        if(p !== this.parent[p]){
            // 路径压缩，在查找的时候，顺便把子节点的父亲改为父亲节点的父亲节点，
            this.parent[p] = this.find(this.parent[p]);
        }
        return this.parent[p];
    }

    isConnected(p, q){
        return this.find(p) === this.find(q);
    }

    unionElements(p, q){
        let pRoot = this.find(p);
        let qRoot = this.find(q);

        if(pRoot === qRoot){
            return ;
        }
        // 防止形成链表，更合理的方案是深度较低的树指向深度较高的那棵树,因为较低的指向较高的，深度不会变化，较高的指向较低的，深度会加1
        if(this.rank[pRoot] > this.rank[qRoot]){
            this.parent[qRoot] = pRoot;
        } else if(this.rank[pRoot] < this.rank[qRoot]) {
            this.parent[pRoot] = qRoot;
        } else {
            this.parent[pRoot] = qRoot;
            this.rank[qRoot] += 1;
        }
    }
}
