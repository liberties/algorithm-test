class Graph {
    constructor(g) {
        this.g = g;
        this.ccount = 0; // 图的联通分量
    }
    addEdge(v, w) {
        this.g.addEdge(v, w);
    }
    // 深搜，求联通分量
    dfs() {
        let visited = {};
        this.ccount = 0;
        for (let i = 0; i < this.g.V(); i++) {
            visited[i] = false;
        }

        for (let i = 0; i < this.g.V(); i++) {
            if (!visited[i]) {
                this._dfs(i, visited);
                this.ccount++;
            }
        }
    }

    // 递归深搜
    _dfs(v, visited) {
        visited[v] = true;
        const graphIterate = this.g.getIterate(v);
        for (
            let i = graphIterate.begin();
            !graphIterate.end();
            i = graphIterate.next()
        ) {
            if (!visited[i]) {
                this._dfs(i, visited);
            }
        }
    }
}

const DenseGraph = require("./DenseGraph");
const SparseGraph = require("./SparseGraph");

const { graphConfigA, graphConfigB } = require("./graph.config");
const denseGraph = new SparseGraph(graphConfigA.max, false);
const graphA = new Graph(denseGraph);

for (let i = 0; i < graphConfigA.length; i++) {
    graphA.addEdge(graphConfigA[i][0], graphConfigA[i][1]);
}
graphA.dfs();
console.log(graphA.ccount);

const denseGraph1 = new DenseGraph(graphConfigB.max, false);
const graphB = new Graph(denseGraph1);
for (let i = 0; i < graphConfigB.length; i++) {
    graphB.addEdge(graphConfigB[i][0], graphConfigB[i][1]);
}
graphB.dfs();
console.log(graphB.ccount);
