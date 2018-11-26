
const LinkedList = require('../linear_list/LinkedList');

// 基于链表的集合实现
class LinkedListSet{
    constructor(){
        this.list = new LinkedList();
    }

    getSize(){
        return this.list.getSize()
    }

    isEmpty(){
        return this.list.isEmpty()
    }

    contains(e){
        return this.list.contains(e);
    }

    add(e){
        if(!this.list.contains(e)){
            this.list.addFirst(e);
        }
    }

    remove(e){
        this.list.removeElement(e);
    }

    toString(){
        return this.list.toString();
    }
}

const llSet = new LinkedListSet();
llSet.add(1)
llSet.add(1)
llSet.add(2)
llSet.add(3)
llSet.add(5)
llSet.add(5)
llSet.add(5)
console.log(llSet.toString());
