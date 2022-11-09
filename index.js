const Elliptic = require("elliptic").ec, Scep256k1 = new Elliptic('secp256k1');

const Block = require("./Block");
const Blockchain = require("./Blockchain");
const Transaction = require("./Transaction");

const myPrivateWallet = Scep256k1.genKeyPair();
const myPublicWallet = myPrivateWallet.getPublic('hex');

const jeanmiPrivateWallet = Scep256k1.genKeyPair();
const jeanmiPublicWallet = jeanmiPrivateWallet.getPublic('hex');

const coincoin = new Blockchain();


coincoin.mine(jeanmiPublicWallet);
coincoin.mine(jeanmiPublicWallet);
coincoin.mine(jeanmiPublicWallet);
coincoin.mine(jeanmiPublicWallet);
coincoin.mine(jeanmiPublicWallet);
coincoin.mine(jeanmiPublicWallet);
coincoin.mine(jeanmiPublicWallet);
coincoin.mine(jeanmiPublicWallet);
coincoin.mine(myPublicWallet);
coincoin.mine(myPublicWallet);
coincoin.mine(myPublicWallet);
coincoin.mine(myPublicWallet);
coincoin.mine(myPublicWallet);
coincoin.mine(myPublicWallet);
coincoin.mine(myPublicWallet);


coincoin.addTransaction(new Transaction("JeVendsMaVoiture", jeanmiPublicWallet, myPublicWallet, 200));
coincoin.mine(myPublicWallet);

coincoin.addTransaction(new Transaction("jAcheteUnTelAJeanMi", myPublicWallet, jeanmiPublicWallet, 100));
coincoin.mine(myPublicWallet);




console.log(coincoin);
console.log(coincoin.chain[1]);
console.log(coincoin.getBalanceOfAddress(myPublicWallet));

