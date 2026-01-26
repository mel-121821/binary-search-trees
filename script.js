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
  // Removed start and end from constructor as the end of the array was being calculated before the arr was sorted and duplicates removed. This caused undefined values at the end of the array to be placed in the tree
  constructor(arr) {
    this.data = this.modArr(arr);
    this.start = 0;
    this.end = this.data.length - 1;
    this.root = this.buildTree(this.data, this.start, this.end);
  }

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
}

const basic = new Tree(basicArr);
console.log(basic);
console.log(basic.root);
console.log(prettyPrint(basic.root));

const regTree = new Tree(arr);
console.log(regTree);
console.log(regTree.root);
console.log(prettyPrint(regTree.root));
