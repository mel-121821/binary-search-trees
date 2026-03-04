# binary-search-trees

[Lesson link](https://www.theodinproject.com/lessons/javascript-binary-search-trees)

---

### Instructions

- [x] **Step 1:**

  Build a `Node` class/factory. It should have an attribute for the data it stores as well as its left and right children.

- [x] **Step 2:**

  Build a `Tree` class/factory which accepts an array when initialized. The `Tree` class should have a `root` attribute, which uses the return value of `buildTree` which you’ll write next.

- [x] **Step 3:**

  Write a `buildTree(array)` function that takes an array of data (e.g., `[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]`) and turns it into a balanced binary tree full of `Node` objects appropriately placed (don’t forget to sort and remove duplicates!). The `buildTree` function should return the level-0 root node.

- [] **Step 4:**

  Write an `includes(value)` function that accepts a value and returns `true` if the given value is in the tree. If the value isn’t in the tree, it should return `false`.

- [x] **Step 5:**

  Write an `insert(value)` function that accepts a value and inserts a new node with that value into the tree. Be sure to insert in a way that preserves the “binary search” property: for each node, every node to its left must have a lower value, and every node to its right must have a greater value. If the function is called with a value that already exists in the tree, the function should do nothing

- [] **Step 6:**

  Write a `deleteItem(value)` function that accepts a value and removes it from the tree. You’ll have to deal with multiple cases for this based on how many children the targeted node has. If the given value doesn’t exist in the tree, the function should do nothing.

- [] **Step 7:**

  Write a `levelOrderForEach(callback)` function that accepts a callback function as its parameter. `levelOrderForEach` should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how `Array.prototype.forEach` might work for arrays. `levelOrderForEach` may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required.\

  **Tip:** You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list.\
  [See Level Order Traversal video](#resources)

- [] **Step 8:**

  Write `inOrderForEach(callback)`, `preOrderForEach(callback)`, and `postOrderForEach(callback)` functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. The functions should throw an Error if no callback is given as an argument, like with `levelOrderForEach`.\
  [See BTT Pre/In/Postorder video](#resources)

- [] **Step 9:**

  Write a `height(value)` function that returns the height of the node containing the given value. Height is defined as the number of edges in the longest path from that node to a leaf node. If the value is not found in the tree, the function should return null.

- [] **Step 10:**

  Write a `depth(value)` function that returns the depth of the node containing the given value. Depth is defined as the number of edges in the path from that node to the root node. If the value is not found in the tree, the function should return null.

- [] **Step 11:**

  Write an `isBalanced` function that checks if the tree is balanced. A binary tree is considered balanced if, for every node in the tree, the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.\
  **Potential Pitfall:** A common mistake is only checking the height difference between the root’s left and right children. That is not enough — you must check the balance condition for every node.

- [] **Step 12:**

  Write a rebalance function that rebalances an unbalanced tree.\ **Tip:** You’ll want to use a traversal method to provide a new array to the buildTree function.

  #### Tie it all together

  Write a driver script that does the following:

- [] **Step 1:**

  Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.

- [] **Step 2:**

  Confirm that the tree is balanced by calling `isBalanced.

- [] **Step 3:**

  Print out all elements in level, pre, post, and in order.

- [] **Step 4:**

  Unbalance the tree by adding several numbers > 100.

- [] **Step 5:**

  Confirm that the tree is unbalanced by calling `isBalanced`.

- [] **Step 6:**

  Balance the tree by calling `rebalance`.

- [] **Step 7:**

  Confirm that the tree is balanced by calling `isBalanced`.

- [] **Step 8:**

  Print out all elements in level, pre, post, and in order.

---

### Resources

Node insertion:
https://www.geeksforgeeks.org/dsa/insertion-in-binary-search-tree/

Node deletion:
https://www.geeksforgeeks.org/dsa/deletion-in-binary-search-tree/

Insertion/deletion video: https://www.youtube.com/watch?v=wcIRPqTR3Kc

Level order traversal video:
https://www.youtube.com/watch?v=86g8jAQug04

Binary Tree Traversal: Preorder, Inorder, Postorder
https://www.youtube.com/watch?v=gm8DUJJhmY4

Stack overflow: Arr sort and filter:
https://stackoverflow.com/questions/4833651/javascript-array-sort-and-unique

MDN Arr.sort():
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

MDN Arr.filter():
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

MDN Math.isFinite():
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite

Get level of a Node in Binary Tree:
https://www.geeksforgeeks.org/dsa/get-level-of-a-node-in-a-binary-tree/

Breath First Search of a Binary Tree:
https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/
