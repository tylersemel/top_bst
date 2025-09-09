class Node {
  left;
  right;
  constructor(data) {
    this.data = data;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(this.array);
  }

  bstRecur(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor(start + (end - start) / 2);

    let root = new Node(array[mid]);

    root.left = this.bstRecur(array, start, mid - 1);
    root.right = this.bstRecur(array, mid + 1, end);

    console.log(mid);
    return root;
  }

  buildTree(array) {
    //first sort array, then remove duplicates
    array.sort((a, b) => {
      if (a > b) return 1;
      if (a == b) return 0;
      if (a < b) return -1;
    });

    let result = [];

    for (let i = 0; i < array.length; i++) {
      if (!result.includes(array[i])) {
        result.push(array[i]);
      }
    }

    console.log(result);

    //return root
    return this.bstRecur(result, 0, result.length - 1);
  }
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let array = [1, 2, 3];
const tree = new Tree(array);
console.log(tree.root);
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

prettyPrint(tree.root);
