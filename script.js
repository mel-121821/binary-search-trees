import { prettyPrint } from "./prettyPrint.js";
import { Tree } from "./tree.js";

// Step 1:

// Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.

function genRandomArr(length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

// const randomArr = genRandomArr(10);
const staticArr = [9, 15, 31, 29, 40, 51, 80, 95];
console.log(staticArr);

const BST = new Tree(staticArr);
console.log(prettyPrint(BST.root));

// Step 2:

// Confirm that the tree is balanced by calling `isBalanced.
console.log(BST.isBalanced());

// Step 3:

// Print out all elements in level, pre, post, and in order.
// console.log(BST.preOrderForEach(BST.printNodeLvl));
// console.log(BST.inOrderForEach(BST.printNodeLvl));
// console.log(BST.postOrderForEach(BST.printNodeLvl));

// Step 4:

// Unbalance the tree by adding several numbers > 100.
BST.insert(111);
BST.insert(124);
BST.insert(159);
console.log(prettyPrint(BST.root));

// Step 5:

// Confirm that the tree is unbalanced by calling isBalanced.
console.log(BST.isBalanced());

// Step 6:

// Balance the tree by calling rebalance.
BST.rebalance();
console.log(prettyPrint(BST.root));

// Step 7:

// Confirm that the tree is balanced by calling isBalanced.
console.log(BST.isBalanced());

// Step 8:

// Print out all elements in level, pre, post, and in order.
// console.log(BST.preOrderForEach(BST.printNodeLvl));
// console.log(BST.inOrderForEach(BST.printNodeLvl));
console.log(BST.postOrderForEach(BST.printNodeLvl));
