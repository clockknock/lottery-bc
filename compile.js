let solc=require("solc");
let path = require("path");
let fs = require("fs");

let src = path.resolve(__dirname,"contracts","Lottery.sol");
let lotterySrc=fs.readFileSync(src,"utf-8");
let result=solc.compile(lotterySrc,1);

module.exports=result.contracts[":Lottery"];