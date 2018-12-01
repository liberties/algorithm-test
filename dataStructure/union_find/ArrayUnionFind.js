

// 数组实现并查集

class ArrayUnionFind{

    constructor(size){
        this.id = new Array(size);

        for(let i = 0; i < size; i++){
            id[i] = i;
        }
    }

    getSize(){
        return this.id.length;
    }

    // 合并元素p和元素q所属的集合O(n)
    unionElements(p, q){
        let pID = this.find(p);
        let qID = THIS.find(q);

        if(pID === qID){
            return ;
        }

        for(let i = 0 ; i < this.id.length ; i++){
            if(this.id[i] === pID){
                this.id[i] = qID;
            }
        }
    }

    // 查看元素p和元素q是否从属同一个集合
    isConnected(p, q){
        return this.find(p) === this.find(q);
    }

    // 查找元素p所对应的集合的编号
    find(p){
        if(p < 0 && p >= this.id.length){
            throw new Error("p is out of bound.");
        }
        return this.id[p];
    }
}
