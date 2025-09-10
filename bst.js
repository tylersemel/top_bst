const { queryObjects } = require("v8");

class Node {
  left;
  right;
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
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

    return root;
  }

  #compare(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  }

  buildTree(array) {
    //first sort array, then remove duplicates
    array.sort(this.#compare);

    let result = [];

    for (let i = 0; i < array.length; i++) {
      if (!result.includes(array[i])) {
        result.push(array[i]);
      }
    }

    //return root
    return this.bstRecur(result, 0, result.length - 1);
  }

  #insertRecur(root, value) {
    if (root == null) {
      return new Node(value);
    }

    if (root.data == value) {
      return root;
    }

    if (value < root.data) {
      root.left = this.#insertRecur(root.left, value);
    } else {
      root.right = this.#insertRecur(root.right, value);
    }

    return root;
  }

  insert(value) {
    if (this.array.includes(value)) {
      return;
    }

    this.array.push(value);
    this.array.sort(this.#compare);

    this.#insertRecur(this.root, value);
  }

  #deleteRecur(root, value) {
    if (root == null) return null;

    if (value < root.data) {
      root.left = this.#deleteRecur(root.left, value);
    } else if (value > root.data) {
      root.right = this.#deleteRecur(root.right, value);
    } else {
      if (root.left == null) {
        return root.right;
      }
      if (root.right == null) {
        return root.left;
      }

      let succ = this.#getSuccerssor(root);
      root.data = succ.data;
      root.right = this.#deleteRecur(root.right, succ.data);
    }

    return root;
  }

  #getSuccerssor(curr) {
    curr = curr.right;
    while (curr != null && curr.left != null) {
      curr = curr.left;
    }

    return curr;
  }

  deleteItem(value) {
    if (!this.array.includes(value)) {
      return;
    }

    this.array.splice(
      this.array.findIndex((item) => item == value),
      1
    );

    this.#deleteRecur(this.root, value);
  }

  #findRecur(root, value) {
    if (root.data == value) return root;

    if (value < root.data && root.left != null) {
      return this.#findRecur(root.left, value);
    }
    if (value > root.data && root.right != null) {
      return this.#findRecur(root.right, value);
    }
  }

  find(value) {
    if (!this.array.includes(value)) {
      return null;
    }

    return this.#findRecur(this.root, value);
  }

  levelOrderForEachIterative(callback) {
    if (!callback) {
      throw new Error("A callback is required!");
    }
    let queue = []; //FIFO

    queue.push(this.root);

    //while queue is not empty
    while (queue.length > 0) {
      let node = queue.shift();

      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }

      callback(node);
    }
  }

  //left, node, right
  inOrderForEach(callback, root) {
    if (!callback) {
      throw new Error("A callback is required!");
    }

    if (root == null) return;

    this.inOrderForEach(callback, root.left);

    callback(root);

    this.inOrderForEach(callback, root.right);
  }

  //root, left, right
  preOrderForEach(callback, root) {
    if (!callback) {
      throw new Error("A callback is required!");
    }

    if (root == null) return;

    callback(root);

    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  //left, right, root
  postOrderForEach(callback, root) {
    if (!callback) {
      throw new Error("A callback is required!");
    }

    if (root == null) return;

    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);

    callback(root);
  }

  #findHeight(value, root) {
    if (root == null) return -1;

    let left = this.#findHeight(value, root.left) + 1;
    let right = this.#findHeight(value, root.right) + 1;

    return left > right ? left : right;
  }

  height(value) {
    //given a node, find it's height
    let node = this.find(value);

    if (!node) return null;

    return this.#findHeight(value, node);
  }

  #findDepth(root, value) {
    if (root.data == value) return 0;

    if (value < root.data && root.left != null) {
      return this.#findDepth(root.left, value) + 1;
    }
    if (value > root.data && root.right != null) {
      return this.#findDepth(root.right, value) + 1;
    }
  }

  depth(value) {
    let node = this.find(value);

    if (!node) return null;

    return this.#findDepth(this.root, value);
  }
}

let array = [0, 2, 10, 17, 18, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let array = [1, 2, 3];
const tree = new Tree(array);
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

function callback(node) {
  console.log(node.data);
}

// tree.insert(10);
// tree.insert(11);
// tree.deleteItem(7);
prettyPrint(tree.root);
// tree.levelOrderForEachIterative(callback, tree.root, 0);
// tree.preOrderForEach(callback, tree.root);
// console.log(" ");
// tree.inOrderForEach(callback, tree.root);
// console.log(" ");
// tree.postOrderForEach(callback, tree.root);

console.log(tree.height(8));
