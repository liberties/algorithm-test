// 红黑树，以2-3树为基础来理解

const COLOR = {
    RED: "RED",
    BLACK: "BLACK"
};

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.color = COLOR.RED;
    }

    toString() {
        return this.key.toString() + " : " + this.value.toString();
    }
}

class RBTree {
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

    //   node                     x
    //  /   \     左旋转         /  \
    // T1   x   --------->   node   T3
    //     / \              /   \
    //    T2 T3            T1   T2
    leftRotate(node) {
        let x = node.right;
        node.right = x.left;
        x.left = node;
        x.color = node.color;
        node.color = COLOR.RED;
        return x;
    }

    //     node                   x
    //    /   \     右旋转       /  \
    //   x    T2   ------->   y   node
    //  / \                       /  \
    // y  T1                     T1  T2
    rightRotate(node) {
        let x = node.left;
        node.left = x.right;
        x.right = node;
        x.color = node.color;
        node.color = COLOR.RED;
        return x;
    }

    // 颜色翻转
    flipColors(node) {
        node.color = COLOR.RED;
        node.left.color = COLOR.BLACK;
        node.right.color = COLOR.BLACK;
    }

    // 判断节点node的颜色，空节点是黑色
    isRed(node) {
        if (node == null) return false;
        return node.color === COLOR.RED;
    }

    add(key, value) {
        this.root = this._add(this.root, key, value);
        this.root.color = COLOR.BLACK;
    }

    // 向以node为根的红黑树中插入元素（key, value），返回插入新节点后红黑树的根
    _add(node, key, value) {
        if (node === null) {
            this.size++;
            return new Node(key, value);
        }

        if (key > node.key) {
            node.right = this._add(node.right, key, value);
        } else if (key < node.key) {
            node.left = this._add(node.left, key, value);
        } else {
            node.value = value;
        }

        // 查看是否需要左右旋转和颜色翻转
        if (this.isRed(node.right) && !this.isRed(node.left)) {
            node = this.leftRotate(node);
        }
        if (this.isRed(node.left) && this.isRed(node.left.left)) {
            node = this.rightRotate(node);
        }
        if (this.isRed(node.left) && this.isRed(node.right)) {
            this.flipColors(node);
        }
        return node;
    }

    keySet() {
        let nodes = [this.root],
            keyArray = [];
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            keyArray.push(node.key);
            if (node.left) {
                nodes.push(node.left);
            }
            if (node.right) {
                nodes.push(node.right);
            }
        }
        return keyArray;
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
        let node = this.getNode(this.root, key);
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

    // 未实现红黑树的删除
    remove(key) {
        const node = this.getNode(this.root, key);
        if (node !== null) {
            this.root = this._remove(this.root, key);
            return node.value;
        }
        return null;
    }

    // 未实现红黑树的删除
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
    toString() {
        let nodes = [this.root],
            keyArray = [];
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            keyArray.push(`${node.key}:${node.color}`);
            if (node.left) {
                nodes.push(node.left);
            }
            if (node.right) {
                nodes.push(node.right);
            }
        }
        return keyArray;
    }
}

module.exports = RBTree;

let rbTree = new RBTree();

rbTree.add(1, 2);
rbTree.add(2, 3);
rbTree.add(4, 3);
rbTree.add(5, 3);
rbTree.add(6, 3);
rbTree.add(7, 3);
console.log(rbTree.toString());
