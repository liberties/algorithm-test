// 二分搜索树

class Node {
    constructor(e) {
        this.e = e;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    size() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    // 向二分搜索树种添加新的元素e
    add(e) {
        this.root = this._add(this.root, e);
    }

    // 向以node为根节点的二分搜索树中插入元素e，递归算法
    _add(node, e) {
        if (node === null) {
            this.size++;
            return new Node(e);
        }

        if (e < node.e) {
            node.left = this._add(node.left, e);
        } else if (e > node.e) {
            node.right = this._add(node.right, e);
        }
        return node;
    }

    // 看二分搜索树中是否包含元素e
    contains(e) {
        return this._contains(this.root, e);
    }

    // 看以node为根节点的二分搜索树中是否存在e
    _contains(node, e) {
        if (node === null) {
            return false;
        }

        if (e === node.e) {
            return true;
        } else if (e < node.e) {
            return this._contains(node.left, e);
        } else {
            return this._contains(node.right, e);
        }
    }

    // 搜索树中的最小值
    minimum() {
        if (this.size === 0) {
            console.error("bst is empty");
            return;
        }
        let node = this._minimum(this.root);
        return node;
    }

    // 搜索树中的最小值，递归算法
    _minimum(node) {
        if (node.left === null) {
            return node;
        }
        return this._minimum(node.left);
    }

    // 删除二分搜索树中的最小值
    removeMin() {
        let ret = this.minimum();
        this._removeMin(this.root);
        return ret;
    }

    _removeMin(node) {
        if (node.left === null) {
            let right = node.right;
            node.right = null;
            this.size--;
            return right;
        }
        node.left = this._removeMin(node.left);
        return node;
    }

    removeMax() {
        const ret = this.maximum();
        this._removeMax(this.root);
        return ret;
    }

    _removeMax(node) {
        if (node.right === null) {
            const left = node.left;
            node.left = null;
            this.size--;
            return left;
        }
        node.right = this._removeMax(node.right);
        return node;
    }

    remove(value){
      this.root = this._remove(this.root, value);
    }

    _remove(node, e){
      if(node === null){
        return null
      }
      if(e < node.e){
        node.left = this._remove(node.left, e);
        return node;
      } else if(e > node.e){
        node.right = this._remove(node.right, e);
        return node;
      } else {
        if(node.left === null){ // 左子树为空
          let rightNode = node.right;
          node.right = null;
          this.size--;
          return rightNode;
        }else if(node.right === null){ // 右子树为空
          let leftNode = node.left;
          node.left = null;
          this.size--;
          return leftNode;
        }else {
          let curNode = this._minimum(node);
          this._removeMin(node);
          curNode.left = node.left;
          curNode.right = node.right;
          node.left = null;
          node.right = null;
          return curNode;
        }
      }
    }

    // 搜索树中的最大值
    maximum() {
        if (this.size === 0) {
            console.error("bst is empty");
            return;
        }
        let node = this._maximum(this.root);
        return node;
    }

    // 搜索树中的最大值，递归算法
    _maximum(node) {
        if (node.right === null) {
            return node;
        }
        return this._maximum(node.right);
    }

    // 广搜，层序遍历
    levelOrder() {
        let queue = [];
        queue.push(this.root);
        while (queue.length !== 0) {
            let node = queue.shift();
            console.log(node.e);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    // 非递归的前序遍历
    proOrderNR() {
        let stack = [];
        stack.push(this.root);
        while (stack.length !== 0) {
            let node = stack.pop();
            console.log(node.e);
            if (node.right) {
                stack.push(node.right);
            }
            if (node.left) {
                stack.push(node.left);
            }
        }
    }

    // 前序遍历
    preOrder(node) {
        if (node === null) {
            return;
        }

        console.log(node.e);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }

    // 中序遍历
    inOrder(node) {
        if (node === null) {
            return;
        }

        this.inOrder(node.left);
        console.log(node.e);
        this.inOrder(node.right);
    }

    // 后序遍历
    postOrder(node) {
        if (node === null) {
            return;
        }

        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.e);
    }

    toString() {
        let res = "";
        res = this.generateBSTString(this.root, 0);
        return res;
    }

    //生成以node为根节点，深度为depth的描述二叉树的字符串
    generateBSTString(node, depth) {
        let res = "";
        if (node === null) {
            return this.generateDepthString(depth) + "null\n";
        }
        // console.log(node.e);
        res += this.generateDepthString(depth) + node.e + "\n";
        res += this.generateBSTString(node.left, depth + 1);
        res += this.generateBSTString(node.right, depth + 1);
        return res;
    }

    generateDepthString(depth) {
        let res = "";
        for (let i = 0; i < depth; i++) {
            res += "--";
        }
        return res;
    }
}

module.exports = BinarySearchTree;

let bst = new BinarySearchTree();
let nums = [5, 3, 6, 8, 4, 2];
for (let num of nums) {
  bst.add(num);
}
bst.remove(4);
console.log(bst.toString());
// bst.minimum();
// bst.levelOrder();
// console.log();
// bst.preOrder(bst.root);
// console.log();
// bst.proOrderNR();
// // bst.toString()
// // console.log(bst.toString());
// console.log();
// bst.inOrder(bst.root);
// console.log();

// bst.postOrder(bst.root);
