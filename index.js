const fs = require('fs')
const TreeNode = require('./treeNode')

const path = require('path')

class Compress {
  constructor() {
    this.byteFrequency = {}
    this.treeNode = new TreeNode()
    this.heap = []
  }

  findSameBytes(arr, x, start, end) {
    if (start > end) return false;

    const mid = Math.floor((start + end) / 2);

    if (arr[mid] === x) {
      return Object.assign(this.byteFrequency, { [x]: this.byteFrequency[x] ? this.byteFrequency[x] + 1 : 1 });
    }

    if (arr[mid] > x) return this.findSameBytes(arr, x, start, mid - 1);
    else return this.findSameBytes(arr, x, mid + 1, end);
  }

  makeHeap(bytes) {
    for (const key in bytes) {
      const newNode = new TreeNode(key, bytes[key])
      const addedNewNode = this.treeNode.addNodeInTree(newNode)

      this.heap.push(addedNewNode.node)
    }
  }

  getEncodedFile() {
    let encoded = ''
    for (const node of this.heap) {
      encoded = encoded + ' ' + node.byte
    }

    return encoded
  }

  compress() {
    const file = './assets/teste.mp4'
    const filename = path.basename(file).split('.')[0]

    const buff = fs.readFileSync(file);
    const newBuff = []

    for (const b of buff) {
      newBuff.push(b.toString(16));
    }

    for (const nb of newBuff) {
      this.findSameBytes(newBuff, nb, 0, newBuff.length - 1)
    }

    this.makeHeap(this.byteFrequency)
    const compressed = this.getEncodedFile(this.byteFrequency)
    
    const newFile = Buffer.from(compressed, 'utf-8')
    fs.createWriteStream(`./assets/output/${filename}.bin`).write(newFile);

    console.log('File Compressed: ', filename)
    console.log('Original Size: ', buff.length)
    console.log('Compressed Size: ', newFile.length)
  }
}

const compress = new Compress()
compress.compress()