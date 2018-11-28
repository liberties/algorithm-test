const BSTMap = require("../set_map/BSTMap");

// 字典树
class Node {
    constructor() {
        this.isWord = false;
        this.next = new BSTMap();
    }

    setWord(bool) {
        this.isWord = bool;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
        this.size = 0;
    }

    // 获得Trie中存储的单词数量
    getSize() {
        return this.size;
    }

    // 向Trie中添加一个新的单词word
    add(word) {
        let cur = this.root;
        for (let i = 0; i < word.length; i++) {
            const c = word.charCodeAt(i);
            if (cur.next.get(c) === null) {
                cur.next.add(c, new Node());
            }
            cur = cur.next.get(c);
        }
        if (!cur.isWord) {
            cur.setWord(true);
            this.size++;
        }
    }

    // 查询单词word是否在Trie中
    contains(word) {
        let cur = this.root;
        for (let i = 0; i < word.length; i++) {
            const c = word.charCodeAt(i);
            if (cur.next.get(c) === null) {
                return false;
            }
            cur = cur.next.get(c);
        }
        return !!cur.isWord;
    }

    // 查询是否在Trie中有单词以prefix为前缀
    isPrefix(prefix) {
        let cur = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const c = prefix.charCodeAt(i);
            if (cur.next.get(c) === null) {
                return false;
            }
            cur = cur.next.get(c);
        }
        return true;
    }

    // 在trie中删除一个单词
    delete(word) {
        let cur = this.root,
            parentNodeArr = [],
            charCodeArr = [];
        for (let i = 0; i < word.length; i++) {
            const c = word.charCodeAt(i);
            if (cur.next.get(c) !== null) {
                parentNodeArr.push(cur);
                charCodeArr.push(c);
                cur = cur.next.get(c);
            } else {
                return false;
            }
        }

        if (!cur.isWord) {
            return false;
        }
        cur.setWord(false);
        while (cur.next.getSize() === 0 && cur !== this.root) {
            const parentNode = parentNodeArr.pop();
            const key = charCodeArr.pop();
            parentNode.next.remove(key);
            cur = parentNode;
        }
        return true;
    }
}

module.exports = Trie;

const trie = new Trie();

trie.add("abcdefg");
trie.add("abc");
console.log(trie.delete("abc"));
console.log(trie.contains("abc"));
console.log(trie.isPrefix("abc"));
