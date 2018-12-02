// AVL树，一种平衡二叉树，维护平衡，不会退化成链表

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }

    toString() {
        return this.key.toString() + " : " + this.value.toString();
    }
}

class AVLTree {
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

    // 获取高度
    getHeight(node){
        if(node === null){
            return 0;
        }
        return node.height;
    }

    // 是否满足搜索树的性质，二分搜索树的中序遍历是从小到大的
    isBST(){
        let keys = [];
        this.inOrder(this.root, keys);
        for(let i = 1 ; i < keys.length ; i++){
            if(keys[i - 1] > keys[i]){
                return false;
            }
        }
        return true;
    }

    // 中序遍历
    inOrder(node, keys){
        if(node === null){
            return ;
        }
        this.inOrder(node.left, keys)
        keys.push(node.key);
        this.inOrder(node.right, keys)

    }

    // 判断是否平衡
    isBalanced(node = this.root){
        if(node === null){
            return true;
        }

        const balanceFactor = Math.abs(this.getBalanceFactor(node));
        if(balanceFactor > 1){
            return false;
        }
        const leftBalanced = this.isBalanced(node.left);
        const rightBalanced = this.isBalanced(node.left);
        return leftBalanced && rightBalanced;
    }

    // 获取平衡因子
    getBalanceFactor(node){
        if(node === null){
            return 0;
        }
        const balanceFactor = this.getHeight(node.left) - this.getHeight(node.right);
        return balanceFactor;
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
            node.left = this._add(node.left, key, value);
        } else {
            node.value = value;
        }
        // 维护一下平衡
        node = this.maintainBalance(node);
        return node;
    }

    // 维护二分搜索树的平衡
    maintainBalance(node){
        if(node === null){
            return null;
        }

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

        const balanceFactor = this.getBalanceFactor(node);
        // 平衡维护,添加元素的时候，可能违反平衡二叉树的性质，所以要进行树的旋转
        // 平衡因子大于1，不满足平衡二叉树条件, 并且是左侧的左侧多了一个节点,所以右旋转
        if(balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0){ // LL
            return this.rightRotate(node);
        }  else if (balanceFactor < -1 && this.getBalanceFactor(node.left) <= 0){ // RR 右侧的右侧多了一个节点，所以左旋转
            return this.leftRotate(node);
        } else if(balanceFactor > 1 && this.getBalanceFactor(node.left) < 0){ // LR ,左侧的右侧多了一个节点，所以先左旋转，把他变成右旋转需要的样子，再右旋转
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        } else if(balanceFactor < -1 && this.getBalanceFactor(node.right) > 0){ // LR, 右侧的左侧多了一个节点
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }

    // 对节点y进行向右旋转操作，返回旋转后新的根节点x
    //        y                              x
    //       / \                           /   \
    //      x   T4     向右旋转 (y)        z     y
    //     / \       - - - - - - - ->    / \   / \
    //    z   T3                       T1  T2 T3 T4
    //   / \
    // T1   T2
    rightRotate(y){
        const x = y.left;
        const T3 = x.right;

        // 向右旋转
        x.right = y;
        y.left = T3;

        // 更新height
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    // 对节点y进行向左旋转操作，返回旋转后新的根节点x
    //    y                             x
    //  /  \                          /   \
    // T1   x      向左旋转 (y)       y     z
    //     / \   - - - - - - - ->   / \   / \
    //   T2  z                     T1 T2 T3 T4
    //      / \
    //     T3 T4
    leftRotate(y){
        const x = y.right;
        const T2 = x.left;

        // 向右旋转
        x.left = y;
        y.right = T2;

        // 更新height
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    keySet(){
        let nodes = [this.root], keyArray = [];
        for(let i = 0 ; i < nodes.length ; i++){
            const node = nodes[i];
            keyArray.push(node.key);
            if(node.left){
                nodes.push(node.left)
            }
            if(node.right){
                nodes.push(node.right)
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

    removeMin(){
        this.root = this._removeMin(this.root);
    }
    _removeMin(node) {
        if (node.left === null) {
            let rightNode = node.right;
            node.right = null;
            this.size--;
            return rightNode;
        }
        node.left = this._removeMin(node.left);
        node = this.maintainBalance(node);
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

    // 删除二叉树中以node为根节点，键为key的一个元素节点
    _remove(node, key) {
        if (node === null) {
            return null;
        }

        let retNode;
        // 被删除的元素比当前节点要小，则继续删除左边
        if (key < node.key) {
            node.left = this._remove(node.left, key);
            retNode = node;
        } else if (key > node.key) {
            node.right = this._remove(node.right, key);
            retNode = node;
        } else {
            // 如果找到了，相等
            if (node.left === null) {
                // 左子树为空，右子树直接提上来覆盖当前父节点
                let rightNode = node.right;
                node.right = null;
                this.size--;
                retNode = rightNode;
            } else if (node.right === null) {
                // 右子树为空，左子树直接提上来覆盖当前父节点
                let leftNode = node.left;
                node.left = null;
                this.size--;
                retNode = leftNode;
            } else {
                // 如果两侧都有元素
                // 将被删除节点的右子树的最小值提取出来，覆盖当前父节点。（左子树的最大值覆盖上来也是一样的）
                let curNode = this.minimum(node.right);
                curNode.right = this._remove(node.right, curNode.key);
                curNode.left = node.left;
                node.left = null;
                node.right = null;
                retNode = curNode;
            }
        }
        retNode = this.maintainBalance(retNode);
        return retNode;
    }
}

module.exports = AVLTree

let avl = new AVLTree();

avl.add(1,2);
// console.log(bstMap.getSize());
avl.add(2,3);
avl.add(4,3);
avl.add(5,3);
avl.add(6,3);
avl.add(7,3);
console.log(avl.keySet());
avl.removeMin()
console.log(avl.keySet())
avl.removeMin()
console.log(avl.keySet())
avl.removeMin()
console.log(avl.keySet())
console.log(avl.isBST());
console.log(avl.isBalanced());
// console.log(bstMap.getSize());
// console.log(bstMap.get(1));
// console.log(bstMap.get(2));

// avl.remove(1);
// console.log(bstMap.getSize());
// console.log(bstMap.get(1));
