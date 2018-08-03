const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface,bytecode} = require('../compile');
const assert = require('assert');


let a = " 0x000000000000000000000000000000000000000000000000000000005b62a275000000000000000000000000ca35b7d915458ef540ade6068dfe2f44e8fa733c0000000000000000000000000000000000000000000000000de0b6b3a7640000";



describe('测试区块链彩票智能合约',()=>{
    it('测试智能合约的编译和部署',async ()=>{
        assert.ok(contract.options.address);
    });

});