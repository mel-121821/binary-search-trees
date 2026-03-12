import { prettyPrint } from "./prettyPrint.js";
import { Tree } from "./tree.js";

const basicArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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

const rebalance = regTree.rebalance();
console.log(prettyPrint(rebalance));

// regTree.levelOrderForEach_Recur(regTree.root);

//____End of project code___________
