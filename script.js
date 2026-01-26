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
  constructor(arr, start = 0, end = arr.length - 1) {
    // get the start and end indices
    this.start = start;
    this.end = end;
    this.root = this.buildTree(arr, start, end);
  }

  buildTree(arr, start, end) {
    // using recursive method

    // set base case
    if (start > end) {
      return null;
    }

    // Remember BEDMAS (Brackets). Init attempt without brackets resulted in end being divided by 2 before being added to start
    // Result: 3 + 4 \ 2 resulting in a midpoint of 5 for basicArr and starting an endless recursion loop!
    const mid = Math.ceil((start + end) / 2);

    const treeNode = new Node(arr[mid]);

    treeNode.left = this.buildTree(arr, start, mid - 1);
    treeNode.right = this.buildTree(arr, mid + 1, end);

    return treeNode;
  }
}

const basic = new Tree(basicArr);
console.log(basic);
console.log(basic.root);

console.log(prettyPrint(basic.root));
