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

    contains(key){
        return this.getNode(this.root, key) !== null;
    }

    get(key){
        let node = this.getNode(this.root, key);
        return node === null ? null : node.value;
    }

    set(key, value){
        let node = this.get(key);
        if(node !== null){
            node.value = value;
        }
    }
}
