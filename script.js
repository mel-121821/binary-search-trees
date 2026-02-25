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

    // FIXED: arr is sorted/filtered when tree class is first created, however, there is nothing to prevent duplicates from being added to the tree later
    // Duplicates aree no longer added to the tree
    console.log(arr);
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
      .filter((el, index, arr) => {
        return index === arr.indexOf(el);
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

  insert(treeNode, value) {
    if (treeNode === null) return new Node(value);

    if (value < treeNode.data) {
      treeNode.left = this.insert(treeNode.left, value);
    } else if (value === treeNode.data) {
      // value is a duplicate value and should not be added to the tree
    } else {
      treeNode.right = this.insert(treeNode.right, value);
    }
    return treeNode;
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(treeNode, value) {
    if (treeNode === null) return treeNode;

    if (value < treeNode.data) {
      treeNode.left = this.deleteItem(treeNode.left, value);
    } else if (value > treeNode.data) {
      treeNode.right = this.deleteItem(treeNode.right, value);
    } else {
      if (treeNode.left === null) return treeNode.right;
      if (treeNode.right === null) return treeNode.left;

      const succ = this.getSuccessor(treeNode);
      treeNode.data = succ.data;
      treeNode.right = this.deleteItem(treeNode.right, succ.data);
    }
    return treeNode;
  }

  levelOrderForEach_Recur(treeNode, fn, lvl = 0) {
    // if no fn param is passed in, this function will assume the lvl param is the fn. The lvl param is a number, so we can incorporate Number.isFinite() into the throw statement. If it translates to a number, we know that the callback was not passed, and throw an error.
    if (!fn || Number.isFinite(fn) === true) {
      throw new Error("This fn requires a callback");
    }
    if (treeNode === null) return;
    const q = [];
    q.push(treeNode);
    lvl++;
    while (q.length > 0) {
      this.levelOrderForEach_Recur(q[0].left, fn, lvl);
      this.levelOrderForEach_Recur(q[0].right, fn, lvl);
      this.callback(q[0].data, lvl);
      q.shift();
    }
  }

  levelOrderForEach_Iterate(treeNode, fn) {}

  callback(value, lvl) {
    // The callback only needs to print the values, the rest of the logic can be contained within the main fn() body
    console.log(`Node ${value} --> level ${lvl}`);
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

regTree.deleteItem(regTree.root, 9);
regTree.deleteItem(regTree.root, 67);
console.log(prettyPrint(regTree.root));

regTree.levelOrderForEach_Recur(regTree.root, regTree.callback);
// regTree.levelOrderForEach_Recur(regTree.root);
