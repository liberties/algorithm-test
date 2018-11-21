// 二分搜索树实现map

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }

    toString() {
        return this.key.toString() + " : " + this.value.toString();
    }
}

class BSTMap {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.getSize() === 0;
    }

    add(key, value) {
        this.root = this._add(this.root, key, value);
    }

    _add(node, key, value) {
        if (node === null) {
            this.size++;
            return new Node(key, value);
        }

        if (key > node.key) {
            node.right = this._add(node.right, key, value);
        } else if (key < node.key) {
            node.left = this._add(node.left, key, right);
        } else {
            node.value = value;
        }
        return node;
    }

    getNode(node, key) {
        if (node === null) {
            return null;
        }
        if (node.key > key) {
            return this.getNode(node.left, key);
        } else if (node.key < key) {
            return this.getNode(node.right, key);
        } else {
            return node;
        }
    }

    contains(key) {
        return this.getNode(this.root, key) !== null;
    }

    get(key) {
        let node = this.getNode(this.root, key);
        return node === null ? null : node.value;
    }

    set(key, value) {
        let node = this.get(key);
        if (node !== null) {
            node.value = value;
        }
    }

    minimum(node) {
        if (node.left === null) {
            return node;
        }
        return this.minimum(node.left);
    }

    removeMin(node) {
        if (node.left === null) {
            let rightNode = node.right;
            node.right = null;
            this.size--;
            return rightNode;
        }
        node.left = this.removeMin(node.left);
        return node;
    }

    remove(key) {
        const node = this.getNode(this.root, key);
        if (node !== null) {
            this.root = this._remove(this.root, key);
            return node.value;
        }
        return null;
    }

    _remove(node, key) {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            node.left = this._remove(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = this._remove(node.right, key);
            return node;
        } else {
            // 如果找到了
            if (node.left === null) {
                // 左子树为空，右子树直接提上来覆盖当前父节点
                let rightNode = node.right;
                node.right = null;
                this.size--;
                return rightNode;
            } else if (node.right === null) {
                // 右子树为空，左子树直接提上来覆盖当前父节点
                let leftNode = node.left;
                node.left = null;
                this.size--;
                return leftNode;
            } else {
                // 如果两侧都有元素
                // 将被删除节点的右子树的最小值提取出来，覆盖当前父节点。（左子树的最大值也是同理）
                let curNode = this.minimum(node);
                this.removeMin(node);
                curNode.left = node.left;
                curNode.right = node.right;
                node.left = null;
                node.right = null;
                return curNode;
            }
        }
    }
}

module.exports = BSTMap

let bstMap = new BSTMap();

bstMap.add(1,2);
console.log(bstMap.getSize());
bstMap.add(2,3);
console.log(bstMap.getSize());
console.log(bstMap.get(1));
console.log(bstMap.get(2));

bstMap.remove(1);
console.log(bstMap.getSize());
console.log(bstMap.get(1));
