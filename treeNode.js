const LEFT = 0;
const RIGHT = 1;

class TreeNode {
  constructor(byte, freq) {
    this.freq = freq
    this.byte = byte;
    this.descendants = []
    this.parent = null,
    this.root = null
    this.size = 0
  }

  get left() {
    return this.descendants[LEFT];
  }

  set left(node) {
    this.descendants[LEFT] = node;
    if (node) {
      node.parent = this;
    }
  }

  get right() {
    return this.descendants[RIGHT];
  }

  set right(node) {
    this.descendants[RIGHT] = node;
    if (node) {
      node.parent = this;
    }
  }

  findNodeAndParent(value) {
    let node = this.root;
    let parent;

    while (node) {
      if (node.value === value) {
        break;
      }
      parent = node;
      node = (value >= node.value) ? node.right : node.left;
    }

    return { found: node, parent };
  }

  addNodeInTree(node) {
    if (this.root) {
      const { found, parent } = this.findNodeAndParent(node.freq);
      if (found) {
        found.meta.multiplicity = (found.meta.multiplicity || 1) + 1;
      } else if (node.freq < parent.freq) {
        parent.left = node;
      } else {
        parent.right = node;
      }
    } else {
      this.root = node;
    }

    this.size += 1;
    return { size: this.size, node }
  }
}

module.exports = TreeNode