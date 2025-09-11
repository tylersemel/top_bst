export class Node {
  left;
  right;
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    array.sort((a, b) => a - b);
    this.array = [];
    for (let i = 0; i < array.length; i++) {
      if (!this.array.includes(array[i])) {
        this.array.push(array[i]);
      }
    }

    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    if (array.length <= 0) return null;

    const mid = Math.floor(array.length / 2);

    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  #insertRecur(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.#insertRecur(value, node.left);
    } else if (value > node.data) {
      node.right = this.#insertRecur(value, node.right);
    }

    return node;
  }

  insert(value) {
    if (this.array.includes(value)) {
      return null;
    }

    this.array.push(value);
    this.array.sort((a, b) => a - b);

    return this.#insertRecur(value);
  }

  #deleteRecur(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.#deleteRecur(value, node.left);
    } else if (value > node.data) {
      node.right = this.#deleteRecur(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      let succ = this.#getSuccerssor(node);
      node.data = succ.data;
      node.right = this.#deleteRecur(succ.data, node.right);
    }

    return node;
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
      return null;
    }

    this.array.splice(
      this.array.findIndex((item) => item == value),
      1
    );

    return this.#deleteRecur(value);
  }

  #findRecur(value, node = this.root) {
    if (!node) return null;

    if (node.data == value) return node;

    if (value < node.data) {
      return this.#findRecur(value, node.left);
    }
    if (value > node.data) {
      return this.#findRecur(value, node.right);
    }
  }

  find(value) {
    if (!this.array.includes(value)) {
      return null;
    }

    return this.#findRecur(value);
  }

  levelOrderForEachIterative(callback) {
    if (!callback) {
      throw new Error("A callback is required!");
    }
    let queue = []; //FIFO

    if (this.root) queue.push(this.root);

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
    if (root == null) return 0;

    let left = this.#findHeight(value, root.left) + 1;

    let right = this.#findHeight(value, root.right) + 1;

    return left > right ? left : right;
  }

  height(value) {
    //given a node, find it's height
    let node = this.find(value);

    if (!node) return null;

    return this.#findHeight(value, node) - 1;
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

  isBalanced() {
    //go through each node and check height of each left and right subtree
    //left, node, right
    let queue = []; //FIFO

    if (this.root) {
      queue.push(this.root);
    }

    //while queue is not empty
    while (queue.length > 0) {
      let node = queue.shift();
      let leftSubtreeHeight = 0;
      let rightSubtreeHeight = 0;
      if (node.left != null) {
        queue.push(node.left);
        leftSubtreeHeight = this.height(node.left.data);
      }
      if (node.right != null) {
        queue.push(node.right);
        rightSubtreeHeight = this.height(node.right.data);
      }

      if (
        (leftSubtreeHeight > rightSubtreeHeight &&
          leftSubtreeHeight - rightSubtreeHeight > 1) ||
        (leftSubtreeHeight < rightSubtreeHeight &&
          rightSubtreeHeight - leftSubtreeHeight > 1)
      ) {
        return false;
      }
    }

    return true;
  }

  rebalance() {
    this.root = null;
    this.root = this.buildTree(this.array);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
