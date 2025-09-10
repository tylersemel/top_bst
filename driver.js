import { Tree } from "./bst.js";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67];

const tree = new Tree(array);

function printNode(node) {
  console.log(node.data);
}

tree.prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.levelOrderForEachIterative(printNode);
console.log(" ");
tree.preOrderForEach(printNode, tree.root);
console.log(" ");
tree.postOrderForEach(printNode, tree.root);
console.log(" ");
tree.inOrderForEach(printNode, tree.root);

tree.insert(110);
tree.insert(204);
tree.insert(220);
tree.insert(560);
tree.insert(101);

console.log(" ");
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.rebalance();
console.log(" ");
tree.levelOrderForEachIterative(printNode);
console.log(" ");
tree.preOrderForEach(printNode, tree.root);
console.log(" ");
tree.postOrderForEach(printNode, tree.root);
console.log(" ");
tree.inOrderForEach(printNode, tree.root);
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
