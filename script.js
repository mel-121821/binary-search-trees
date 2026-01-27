// PrettyPrint fn() supplied by TOP - BST lesson

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

//______________________________________________

// Project Code

const basicArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    // NOTE: this.data as a variable name is duplicated from Node, may cause an issue, but leaving for now

    // NOTE: arr is sorted/filtered when tree class is first created, however, there is nothing to prevent duplicates from being added to the tree later

    this.data = this.modArr(arr);
    this.start = 0;
    this.end = this.data.length - 1;
    this.root = this.buildTree(this.data, this.start, this.end);
  }

  modArr = (arr) => {
    const modArr = arr
      .sort((a, b) => {
        return a - b;
      })
      .filter((el, index, a) => {
        return index === a.indexOf(el);
      });
    return modArr;
  };

  buildTree(arr, start, end) {
    // base case
    if (start > end) {
      return null;
    }

    const mid = Math.ceil((start + end) / 2);

    const treeNode = new Node(arr[mid]);

    treeNode.left = this.buildTree(arr, start, mid - 1);
    treeNode.right = this.buildTree(arr, mid + 1, end);

    return treeNode;
  }

  // NOTE: All new values are inserted as leaf nodes, not branches

  // NOTE: New insertions can cause the tree to become unbalanced - may require rebalancing

  insert(treeNode, key) {
    if (treeNode === null) return new Node(key);

    if (key < treeNode.data) {
      treeNode.left = this.insert(treeNode.left, key);
    } else {
      treeNode.right = this.insert(treeNode.right, key);
    }
    return treeNode;
  }
}

const basic = new Tree(basicArr);
console.log(basic);
console.log(basic.root);
console.log(prettyPrint(basic.root));

const regTree = new Tree(arr);
console.log(regTree);
console.log(regTree.root);
regTree.insert(regTree.root, 666);
regTree.insert(regTree.root, 9);
regTree.insert(regTree.root, 6);
regTree.insert(regTree.root, 10);
console.log(prettyPrint(regTree.root));
