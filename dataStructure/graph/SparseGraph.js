

// 稀疏图，邻接表

class SparseGraph{
    constructor(n, directed){
        this.n = n; // 顶点个数
        this.m = 0; // 边的数目
        this.g = [];
        for(let i = 0 ; i < n ; i++){
            let colArr = [];
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

        this.g[v].push(w);;
        if(v !== w && !this.directed){
            this.g[w][v] = true;
        }
        this.m++;
    }

    // 判断两个顶点之间有没有边，O(n)
    hasEdge(v, w){
        if(v < 0 || v >= n || w < 0 || w>= n){
            throw new Error('vertex is illegal')
        }
        for(let i = 0 ; i < this.g[v].length ; i++){
            if(this.g[v][i] === w){
                return true;
            }
        }
        return false;
    }
}
