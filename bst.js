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
    if (root.data == value) return root.data;

    if (value < root.data && root.left != null) {
      return this.#findRecur(root.left, value);
    } else if (value > root.data && root.right != null) {
      return this.#findRecur(root.right, value);
    }
  }

  find(value) {
    if (!this.array.includes(value)) {
      return "testomg";
    }

    return this.#findRecur(this.root, value);
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

// tree.insert(10);
// tree.insert(11);
// tree.deleteItem(7);
prettyPrint(tree.root);
console.log(tree.find(7));
