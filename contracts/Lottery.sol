pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract Lottery {

    address public manager;
    address[] private players;
    Winner[] private winners;
    bool isPickingWinner = false;

    Winner winner;

    struct Winner {
        uint timestamp;
        address winnerAddr;
        uint gain;
    }

    function Lottery() public {
        manager = msg.sender;
    }

    function getManager() public view returns (address){
        return manager;
    }

    function entry() public payable {
        require(!isPickingWinner);
        require(msg.value == 1 ether);
        players.push(msg.sender);
    }

    function getPlayers() public view returns (address[]){
        return players;
    }

    function getBalance() public view returns (uint){
        return this.balance;
    }

    function pickWinner() onlyManagerCanCall public {
        isPickingWinner = true;

        require(manager == msg.sender);
        uint index = random() % players.length;
        address winnerAddr = players[index];
        winner = Winner(now, winnerAddr, this.balance);
        winners.push(winner);


        winnerAddr.transfer(this.balance);
        players = new address[](0);

        isPickingWinner = false;

    }

    function refund() public onlyManagerCanCall {
        for (uint i = 0; i < players.length; i++) {
            players[i].transfer(1 ether);
        }
        players = new address[](0);
    }

    function showWinners() public view returns (Winner[]){
        return winners;
    }

    function showThisWinner() public view returns (Winner){
        return winner;
    }

    function random() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }

    modifier onlyManagerCanCall(){
        require(msg.sender == manager);
        _;
    }

}