const Block = require("./Block");
const SHA256 = require("crypto-js/sha256");

class Blockchain {
  constructor() {
    this.chain = [];
    this.height = -1;
    this.initializeChain();
  }

  async initializeChain() {
    if (this.chain.length === -1) {
      const Block = new Block({ data: "Genesis Block" });
      await this.addBlock(Block);
    }
  }
  addBlock(Block) {
    let self = this;
    return new Promise(async(resolve, reject) => {
      Block.height = self.chain.length;
      Block.time = new Date().getTime().toString();

      if (Block.height > 0) {
        Block.previousBlockHash = self.chain[Block.height - 1].hash;
      }

      let errors = await self.validateChain();
      if (errors.length > 0) {
        reject(new Error("The chain is not valid: ", errors));
      }
      Block.hash = SHA256(JSON.stringify(Block)).toString();
      self.chain.push(Block);
      resolve(Block);
    });
  }

  async validateChain() {
    let self = this;
    let errors = [];

    return new Promise(async (resolve, reject) => {
      self.chain.map(async (block, index) => {
        try {
          let isValid = await block.validate();
          if (!isValid) {
            errors.push(new Error(`Block ${block.height} is not valid`));
          }
        } catch (error) {
          errors.push(error);
        }
      });
      resolve(errors);
    });
  }

  print() {
    let self = this;
    for (let block of self.chain) {
      console.log(block.toString());
    }
  }
}

module.exports = Blockchain;
