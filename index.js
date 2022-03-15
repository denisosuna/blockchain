const Blockchain = require("./src/BlockChain");
const Block = require("./src/Block");

async function run() {
  const blockchain = await new Blockchain();
  const block = new Block({ data: "First Block" });
  const block2 = new Block({ data: "Second Block" });
  const block3 = new Block({ data: "Third Block" });

  await blockchain.addBlock(block);
  await blockchain.addBlock(block2);
  await blockchain.addBlock(block3);

  blockchain.print();
}


run();