const SHA256 = require ('crypto-js/sha256');

class Block {
    constructor (index, timestamp, data, previousHash = ''){
        this.index= index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';

    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
       this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "16/10/2023", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let chainCoin = new Blockchain();
chainCoin.addBlock(new Block(1, "17/10/2023", {amount: 4}));
chainCoin.addBlock(new Block(2, "19/10/2023", {amount: 10}));

console.log(JSON.stringify(chainCoin, null, 4));