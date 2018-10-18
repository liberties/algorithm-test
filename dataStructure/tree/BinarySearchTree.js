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

  traverse() {
    this._traverse(this.root);
  }

  _traverse(node) {
    if (node === null) {
      return;
    }

    console.log(node.e);
    this._traverse(node.left);
    this._traverse(node.right);
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
    return res
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
// bst.traverse();
// bst.toString()
console.log(bst.toString());
