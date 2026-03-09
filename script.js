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
    // Duplicates are no longer added to the tree
    console.log(arr);
    this.data = this.sortAndRemoveDuplicates(arr);
    this.start = 0;
    this.end = this.data.length - 1;
    this.root = this.buildTree(this.data, this.start, this.end);
  }

  sortAndRemoveDuplicates = (arr) => {
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

    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  // NOTE: All new values are inserted as leaf nodes, not branches

  // NOTE: New insertions can cause the tree to become unbalanced - may require rebalancing

  includes(value, node = this.root) {
    if (node === null) {
      console.log(`Value ${value} was not found`);
      return false;
    }

    if (value < node.data) this.includes(value, node.left);
    if (value > node.data) this.includes(value, node.right);
    if (value === node.data) {
      console.log(`Value ${value} was found!`);
      return true;
    }
  }

  insert(value, node = this.root) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value === node.data) {
      // value is a duplicate value and should not be added to the tree
    } else {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return node;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      const succ = this.getSuccessor(node);
      node.data = succ.data;
      node.right = this.deleteItem(succ.data, node.right);
    }
    return node;
  }

  levelOrderForEach_Recur(fn, lvl = 1, q = [this.root]) {
    // if no fn param is passed in, this function will assume the lvl param is the fn. The lvl param is a number, so we can incorporate Number.isFinite() into the throw statement. If it translates to a number, we know that the callback was not passed, and throw an error
    if (!fn || Number.isFinite(fn) === true) {
      console.log(fn);
      throw new Error("This fn requires a callback");
    }
    if (!q.length) return;

    while (q.length) {
      let qLen = q.length;

      for (let i = 0; i < qLen; i++) {
        let front = q.shift();
        if (front.left !== null) {
          q.push(front.left);
        }
        if (front.right !== null) {
          q.push(front.right);
        }
        fn(front.data, lvl);
      }
      lvl++;
      this.levelOrderForEach_Recur(fn, lvl, q);
    }
  }

  levelOrderForEach_Iterate(fn, node = this.root) {
    if (!fn) {
      throw new Error("This fn requires a callback");
    }
    if (node === null) return;
    const q = [];
    q.push(node);
    let lvl = 1;
    while (q.length > 0) {
      let qLen = q.length;

      for (let i = 0; i < qLen; i++) {
        let front = q.shift();
        if (front.left !== null) {
          q.push(front.left);
        }
        if (front.right !== null) {
          q.push(front.right);
        }
        fn(front.data, lvl);
      }
      lvl++;
    }
  }

  printNodeLvl(value, lvl) {
    // The callback only needs to print the values, the rest of the logic can be contained within the main fn() body
    console.log(`Node ${value} --> level ${lvl}`);
  }

  preOrderForEach(fn, lvl = 0, node = this.root) {
    if (!fn || Number.isFinite(fn) === true) {
      throw new Error("This fn requires a callback");
    }
    if (node === null) return;
    lvl++;
    this.printNodeLvl(node.data, lvl);
    this.preOrderForEach(fn, lvl, node.left);
    this.preOrderForEach(fn, lvl, node.right);
  }

  inOrderForEach(fn, lvl = 0, node = this.root) {
    if (!fn || Number.isFinite(fn) === true) {
      throw new Error("This fn requires a callback");
    }
    if (node === null) return;
    lvl++;
    this.inOrderForEach(fn, lvl, node.left);
    this.printNodeLvl(node.data, lvl);
    this.inOrderForEach(fn, lvl, node.right);
  }

  postOrderForEach(fn, lvl = 0, node = this.root) {
    if (!fn || Number.isFinite(fn) === true) {
      throw new Error("This fn requires a callback");
    }
    if (node === null) return;
    lvl++;
    this.postOrderForEach(fn, lvl, node.left);
    this.postOrderForEach(fn, lvl, node.right);
    this.printNodeLvl(node.data, lvl);
  }

  height(value, node = this.root) {
    // measured from the bottom of the tree

    if (node === null) {
      console.log(`${value} was not found`);
      return undefined;
    }
    if (value < node.data) return this.height(value, node.left);
    if (value > node.data) return this.height(value, node.right);
    if (value === node.data) {
      console.log(
        `The value ${value} is at the following level when measured from its lowest leaf node:`
      );
      return this.getValueHeight(node);
    }
  }

  getValueHeight(node) {
    if (node === null) return;
    return (
      1 +
      Math.max(
        node.left !== null ? this.getValueHeight(node.left) : -1,
        node.right !== null ? this.getValueHeight(node.right) : -1
      )
    );
  }

  depth(value, node = this.root, lvl = 0) {
    // measured from the top of the tree
    if (node === null) {
      console.log(`${value} was not found`);
      return undefined;
    }
    lvl++;
    if (value < node.data) return this.depth(value, node.left, lvl);
    if (value > node.data) return this.depth(value, node.right, lvl);
    if (value === node.data) {
      console.log(`The value ${value} was found at a depth of ${lvl}`);
      return lvl;
    }
    return;
  }

  isBalanced(lvl = 1, q = [this.root]) {
    if (!q.length) return;

    while (q.length) {
      let qLen = q.length;

      for (let i = 0; i < qLen; i++) {
        let front = q.shift();
        if (front.left !== null) {
          q.push(front.left);
        }
        if (front.right !== null) {
          q.push(front.right);
        }
      }
      console.log(`at level ${lvl}, q length = ${q.length}`);
      if (q.length < lvl * 2) {
        console.log("bottom level reached");
        console.log(q);
        let isBalanced = true;
        for (let node of q) {
          if (node.right !== null || node.left !== null) {
            console.log("Tree is unbalanced");
            isBalanced = false;
          } else {
            console.log(`Subtree at node ${node.data} is balanced`);
          }
        }
        return isBalanced;
      }
      lvl++;
    }
  }
}

const basic = new Tree(basicArr);
console.log(basic);
console.log(basic.root);
console.log(prettyPrint(basic.root));

const regTree = new Tree(arr);
console.log(regTree);
console.log(regTree.root);

regTree.includes(324);
regTree.includes(72);

// regTree.insert(666);
// regTree.insert(9);
// regTree.insert(6);
// regTree.insert(10);

// regTree.deleteItem(9);
// regTree.deleteItem(67);
// regTree.deleteItem(0);
console.log(prettyPrint(regTree.root));

// regTree.levelOrderForEach_Recur(regTree.printNodeLvl);
// regTree.levelOrderForEach_Iterate(regTree.printNodeLvl);
// regTree.preOrderForEach(regTree.printNodeLvl);
// regTree.inOrderForEach(regTree.printNodeLvl);
// regTree.postOrderForEach(regTree.printNodeLvl);

// regTree.height(3);
// const heightTest = regTree.height(42);
// console.log(heightTest);
// const heightTest2 = regTree.height(3);
// console.log(heightTest2);
// const heightTest3 = regTree.height(8);
// console.log(heightTest3);

// // regTree.depth(3);
// const depthTest = regTree.depth(3);
// console.log(depthTest);

const balanceTest = regTree.isBalanced();
console.log(balanceTest);

// regTree.levelOrderForEach_Recur(regTree.root);

//____End of project code___________
