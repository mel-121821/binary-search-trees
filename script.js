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

    const treeNode = new Node(arr[mid]);

    treeNode.left = this.buildTree(arr, start, mid - 1);
    treeNode.right = this.buildTree(arr, mid + 1, end);

    return treeNode;
  }

  // NOTE: All new values are inserted as leaf nodes, not branches

  // NOTE: New insertions can cause the tree to become unbalanced - may require rebalancing

  includes(value, node = this.root) {
    if (node === null) {
      console.log(`Value: ${value} was not found`);
      return false;
    }

    if (value < node.data) this.includes(value, node.left);
    if (value > node.data) this.includes(value, node.right);
    if (value === node.data) {
      console.log(`Value ${value} was found!`);
      return true;
    }
  }

  insert(value, treeNode = this.root) {
    if (treeNode === null) return new Node(value);

    if (value < treeNode.data) {
      treeNode.left = this.insert(value, treeNode.left);
    } else if (value === treeNode.data) {
      // value is a duplicate value and should not be added to the tree
    } else {
      treeNode.right = this.insert(value, treeNode.right);
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

  deleteItem(value, treeNode = this.root) {
    if (treeNode === null) return treeNode;

    if (value < treeNode.data) {
      treeNode.left = this.deleteItem(value, treeNode.left);
    } else if (value > treeNode.data) {
      treeNode.right = this.deleteItem(value, treeNode.right);
    } else {
      if (treeNode.left === null) return treeNode.right;
      if (treeNode.right === null) return treeNode.left;

      const succ = this.getSuccessor(treeNode);
      treeNode.data = succ.data;
      treeNode.right = this.deleteItem(succ.data, treeNode.right);
    }
    return treeNode;
  }

  // ___________;

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

  levelOrderForEach_Iterate(treeNode, fn) {
    if (!fn) {
      throw new Error("This fn requires a callback");
    }
    if (treeNode === null) return;
    const q = [];
    q.push(treeNode);
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

regTree.includes(324);
regTree.includes(72);

regTree.insert(666);
regTree.insert(9);
regTree.insert(6);
regTree.insert(10);

regTree.deleteItem(9);
regTree.deleteItem(67);
regTree.deleteItem(0);
console.log(prettyPrint(regTree.root));

regTree.levelOrderForEach_Recur(regTree.callback);
// regTree.levelOrderForEach_Recur(regTree.root);

//____End of project code___________

// Failed attemptes at Recursion of levelOrderForEach:

// Attempt 1:

//  levelOrderForEach_Recur(treeNode, fn, lvl = 1, q = []) {
//     .
//     if (!fn || Number.isFinite(fn) === true) {
//       console.log(fn);
//       throw new Error("This fn requires a callback");
//     }
//     if (treeNode === null) return;

//     fn(treeNode.data, lvl);
//     console.log(...q);
//     if (treeNode.left !== null) {
//       q.push(treeNode.left);
//     }

//     if (treeNode.right !== null) {
//       q.push(treeNode.right);
//     }

//     lvl++;
//     while (q.length > 0) {
//       // get first node
//       // set lvl
//       // make q --> q = [Node 8]
//       // visit first node and print with callback
//       // push left and right nodes to q --> q = [Node 8, Node 4, Node 67]
//       // Remove 1st Node --> q = [Node 4, Node67]
//       // Increase lvl by 1
//       //
//       // Note: fn needs the args - fn, q and lvl

//       q.shift(); // remove front of q
//       // fn(front.data, lvl); // print the value
//       const front = q[0];
//       this.levelOrderForEach_Recur(front, fn, lvl, q);
//       // this.levelOrderForEach_Recur(front.left, fn, lvl, q);
//       // this.levelOrderForEach_Recur(front.right, fn, lvl, q);
//       // add left and right nodes to q
//     }
//   }

// Attempt 2 (Pseudocode mixed in):

// levelOrderForEach_Recur(fn, lvl = 1, q = [this.root]) {
//   if (!q.length) return;
//   // Visit first Node --> Node 8
//   // place r and l addresses in the q --> q = [Node 8, Node 4, Node 67]
//

//   if (front.left !== null) q.push(front.left);
//   if (front.right !== null) q.push(front.right);

//   // fn - print node data and lvl
//   fn(q[0].data, lvl);

//   while (q.length) {
//     // q.shift(); // --> [Node 4, Node 67]
//     if (q.length >= lvl * 2) lvl++;
//     this.levelOrderForEach_Recur(fn, lvl, q);
//   }

//   // # of values double for every level --> if q.length >= lvl * 2 --> lvl ++ --> q.len = 2, lvl * 2 = 2 --.returns true, lvl == 2

//   // Recursive call on q values instead of on binary tree??

//   // Recursively call on new q --> [Node 4, Node 67]
//   // visit first node --> Node 4
//   // add r and l addresses to q --> q = [Node 4, Node 67, Node 3, Node 7]
//   // fn - print node data and lvl
//   // q.shift --> [Node 67, Node 3, Node 7]
//   // if q.length >= lvl * 2 --> lvl ++ --> q.len = 3, lvl * 2 = 4 --.returns false, lvl == 2

//   // Recursive call on new q --> [Node 67, Node 3, Node 7]
//   // Visit first Node --> Node 67
//   // add r and l addresses to q --> q = [Node 67, Node 3, Node 7, Node 23, Node 6345]
//   // fn - print data and lvl
//   // q.shift --> [Node 3, Node, 7, Node 23, Node 6345]
//   // if q.length >= lvl * 2 --> lvl ++ --> q.len = 4, lvl * 2 = 4 --.returns true, lvl == 3

//   // Recur on new q --> [Node 3, Node 7, Node 23, Node 6345]
//   // Visit first Node --> Node 3
//   // if q.length >= lvl * 2 --> lvl ++ --> q.len = 4, lvl * 2 = 4 --.returns true, lvl == 3
//   // add l and r addresses to the q if not null --> q = [Node 3, Node, 7, Node 23, Node 6345, Node 1]
//   // fn - print data and lvl
//   // q.shift --> [Node, 7, Node 23, Node 6345, Node 1]

//   // Recur on new q --> [Node 7, Node 23, Node 6345, Node 1]
//   // Visit first Node --> Node 7
//   // if q.length >= lvl * 2 --> lvl ++ --> q.len = 4, lvl * 2 = 4 --.returns true, lvl == 3

// Note: This line not work for the last level in the tree, as there are not enough nodes to fill the level

//         ___________8___________
//         |                     |
//    _____4_____           _____67_____
//    |         |           |          |
// ___3___   ___7___     ___23___ ___ 6345___
// |      |  |     |     |      | |         |
// 1         5           9        324
// }
