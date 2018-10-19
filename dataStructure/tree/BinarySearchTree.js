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
    } else {
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

  // 广搜，层序遍历
  levelOrder(){
    let queue = [];
    queue.push(this.root);
    while(queue.length !== 0){
      let node = queue.shift();
      console.log(node.e);
      if(node.left){
        queue.push(node.left);
      }
      if(node.right){
        queue.push(node.right);
      }
    }
  }

  // 非递归的前序遍历
  proOrderNR(){
    let stack = [];
    stack.push(this.root);
    while(stack.length !== 0){
      let node = stack.pop();
      console.log(node.e);
      if(node.right){
        stack.push(node.right);
      }
      if(node.left){
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

let bst = new BinarySearchTree();
let nums = [5, 3, 6, 8, 4, 2];
for (let num of nums) {
  bst.add(num);
}
bst.levelOrder();
console.log();
bst.preOrder(bst.root);
console.log();
bst.proOrderNR();
// bst.toString()
// console.log(bst.toString());
console.log();
bst.inOrder(bst.root);
console.log();

bst.postOrder(bst.root);
