

// 稀疏图，邻接表

class SparseGraph{
    constructor(n, directed){
        this.n = n; // 顶点个数
        this.m = 0; // 边的数目
        this.directed = directed; // 是否是有向图
        this.g = []; // 图
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
        if(v < 0 || v >= this.n || w < 0 || w>= this.n){
            throw new Error('vertex is illegal')
        }

        this.g[v].push(w);
        if(v !== w && !this.directed){
            this.g[w].push(v);
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

    getIterate(nodeId){
        let index = 0, v = nodeId;
        return {
            begin:() => {
                index = 0;
                if(this.g[v].length){
                    return this.g[v][index];
                }
                return -1;
            },

            next:() => {
                index++;
                if(index < this.g[v].length){
                    return this.g[v][index]
                }
                return -1;
            },

            end:() => {
                return index >= this.g[v].length
            }
        }
    }
}

module.exports = SparseGraph;

// const getRandomInt = (function() {
//     let hash = {};
//     return function(min, max) {
//         min = Math.ceil(min);
//         max = Math.floor(max);
//         let randomNum, random1, random2;
//         do {
//             random1 = Math.floor(Math.random() * (max - min)) + min;
//             random2 = Math.floor(Math.random() * (max - min)) + min;
//             randomNum = random1 + '-' + random2;
//         } while (hash[randomNum]);
//         hash[randomNum] = 1;
//         return [random1, random2];
//     };
// })();

// const n = 20;
// const m = 100;
// const graph = new SparseGraph(n, false);
// for(let i = 0 ; i < m ; i++){
//     const [a, b] = getRandomInt(0, 20);
//     graph.addEdge(a, b);
// }

// let a = 0;
// for(let v = 0 ; v < n ; v++){
//     const graphIterate = graph.getIterate(v);
//     let str = `${v} : `;
//     for(let i = graphIterate.begin(); !graphIterate.end() ; i = graphIterate.next()){
//         a++;
//         str += i + ' ';
//     }
//     console.log(str);
// }

// console.log(a);
