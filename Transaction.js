const Blockchain = require("./Blockchain");

class Transaction{

    constructor(label, from, to, amount, smartContract = null){
        this.label = label;
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.smartContract = smartContract;
    }

    /**
     *
     * @param {Blockchain} blockchain
     * @returns {boolean}
     */
    isValid(blockchain){

        if(!this.from || !this.to) {
            throw Error("The transaction has an empty field");
        }

        if(this.from === this.to) {
            throw Error("You can't send coin to yourself");
        }

        if(this.amount < 0) {
            throw Error("The transaction can't be negative");
        }

        if(this.from !== blockchain.mintPublicAddress) {
            if(blockchain.getBalanceOfAddress(this.from) < this.amount ) {
                throw new Error("The sender has not enough coincoin");
            }
        }

        return true;
    }


}

module.exports = Transaction;