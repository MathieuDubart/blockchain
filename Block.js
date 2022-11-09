const crypto = require("crypto");
const SHA256 = (data) => crypto.createHash("sha256").update(data).digest("hex");


class Block {

    static get difficulty() {
        return 5;
    }

    /**
     *
     * @param {String} previousHash
     * @param {Array<Transaction>} data
     */

    constructor(previousHash, data = []) {
        this.timestamp = Date.now().toString();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = null;
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    #mineonce() {
        this.hash = this.calculateHash();
        if(this.hash.substring(0, Block.difficulty) !== "0".repeat(Block.difficulty) ) {
            this.nonce++;
            return false;
        }
        return true;
    }

    mine() {
        const startDate = new Date();

        while(!this.#mineonce()) {
            this.#mineonce();
        }

        return (new Date().getTime() - startDate.getTime())/ 1000;
    }

    isValid() {
        if(this.hash.substring(0, Block.difficulty) !== "0".repeat(Block.difficulty)) {
            throw new Error("Wrong block hash");
        }

        if(!this.previousHash) {
            throw new Error("No previous hash provided");
        }

        return true;
    }
}

module.exports = Block;
