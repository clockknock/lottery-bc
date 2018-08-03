let {interface, bytecode} = require("./compile");
let Web3 = require("web3");
let config=require("./config");

let HdWalletProvider = require("truffle-hdwallet-provider");
let mnemonic = config.mnemonic;
//HdWalletProvider如何提供多个初始帐号:
// https://ethereum.stackexchange.com/questions/41283/why-does-web3-eth-getaccounts-return-only-1-account
let provider = new HdWalletProvider(mnemonic, config.provider_url, 0, 10);

let web3 = new Web3(provider);

/**
 * 发布合约,记录合约地址和abi
 * @returns {Promise<void>}
 */
deploy = async () => {
    let accounts = await web3.eth.getAccounts();

    let contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
                data: bytecode
            }
        ).send({
            from: accounts[0],
            gas: "3000000"
        });
    console.log("address:" + contract.options.address);
    console.log("=====================================");
    console.log(interface);
};

/**
 * 查看一下转账收据
 * @returns {Promise<void>}
 */
showReceipt = async () => {
    let accounts = await web3.eth.getAccounts();

   let receipt=await web3.eth.sendTransaction({
        from:accounts[0],
        to:accounts[1],
        value:"1000000000000000000"
    });

    console.log(receipt);

};


