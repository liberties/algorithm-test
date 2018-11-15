
const BST = require('./BinarySearchTree');

// 基于二分搜索树的集合实现
class BSTSet{
    constructor(){
        this.bst = new BST();
    }

    getSize(){
        return this.bst.size();
    }

    isEmpty(){
        return this.bst.isEmpty();
    }

    add(e){
        this.bst.add(e)
    }

    contains(e){
        return this.bst.contains(e);
    }

    toString(){
        return this.bst.toString();
    }
}

const bstSet = new BSTSet();
bstSet.add(1)
bstSet.add(1)
bstSet.add(2)
bstSet.add(3)
console.log(bstSet.toString());
