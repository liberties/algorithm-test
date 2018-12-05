

// 稠密图，邻接矩阵

class DenseGraph{
    constructor(n, directed){
        this.n = n; // 顶点数
        this.m = 0; // 边数
        this.directed = directed; // 有向
        this.g = [];
        for(let i = 0 ; i < n ; i++){
            let colArr = [];
            for(let j = 0 ; j < n ; j++){
                colArr.push(false);
            }
            this.g.push(colArr);
        }
    }

    V(){
        return this.n;
    }

    E(){
        return this.m;
    }

    // 在顶点v和顶点w之间添加一条边
    addEdge(v, w){
        if(v < 0 || v >= n || w < 0 || w>= n){
            throw new Error('vertex is illegal')
        }

        if(this.hasEdge(v, w)){
            return ;
        }
        this.g[v][w] = true;
        if(!this.directed){
            this.g[w][v] = true;
        }
        this.m++;
    }

    // 判断两个顶点之间有没有边
    hasEdge(v, w){
        if(v < 0 || v >= n || w < 0 || w>= n){
            throw new Error('vertex is illegal')
        }
        return this.g[v][w];
    }
}

module.exports = DenseGraph;
