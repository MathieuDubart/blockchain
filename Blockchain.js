const Elliptic = require("elliptic").ec, Scep256k1 = new Elliptic('secp256k1');
const Block = require("./Block");
const Transaction = require("./Transaction");

class Blockchain {

    static get REWARD() {
        return 1.38;
    }

    constructor() {
        this.mintPublicAddress = Scep256k1.genKeyPair().getPublic('hex');

        const genesisBlock = new Block(null);
        genesisBlock.mine();

        this.chain = [genesisBlock];
        this.mempool = [];

    }

    mine(rewardAddress){
        const rewardTransaction = new Transaction("REWARD", this.mintPublicAddress, rewardAddress, Blockchain.REWARD);
        const block = new Block(this.getLastBlock().hash, [ ...this.mempool, rewardTransaction]);
        block.mine()
        this.addBlock(block);
        this.mempool = [];
    }

    /**
     *
     * @param {Transaction} transaction
     */
    addTransaction(transaction){
        if (!transaction.isValid(this)) {
            throw new Error("Invalid Transaction");
        }

        this.mempool.push(transaction);
    }

    /**
     * @param {Block} block
     */
    addBlock(block){
        if(!block.isValid()) {
            throw new Error("The block is invalid");
        }
        if(this.getLastBlock().hash !== block.previousHash) {
            throw new Error("The previous hash is not valid");
        }
        this.chain.push(block);
    }

    getLastBlock() {
        return this.chain[this.chain.length-1];
    }

    getBalanceOfAddress(address, untilThisBlock = this.getLastBlock()) {
        let balance = 0;

        for(let i=0; i<this.chain.length; i++) {
            const _block = this.chain[i];

            for(let j = 0; j < _block.data.length; j++) {
                const _transaction = _block.data[j];

                if(_transaction.from === address) {
                    balance -= _transaction.amount;
                }

                if(_transaction.to === address) {
                    balance += _transaction.amount;
                }
            }

            if(_block.hash === untilThisBlock.hash) {
                return balance;
            }

        }
    }


}

module.exports = Blockchain;