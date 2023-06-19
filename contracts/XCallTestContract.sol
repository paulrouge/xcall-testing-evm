// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../solidity-stringutils/strings.sol";

contract XCallTestContract {
    using strings for *;
    
    address private XCALL_BSC               = 0x6193c0b12116c4963594761d859571b9950a8686;
    string private BTP_ADDRESS_BERLIN_DAPP  = "btp://0x7.icon/cx091192553d2990245988b6ccd62dbb4f53dcb568";   
    string public logString;
    uint public latestFeeCheck;

    struct XCallMessage {
        string method;
        XCallParams[] params;
    }

    struct XCallParams {
        string key;
        string value;
    }
    
    // a struct that holds: message, message id, array of addresses that have sent a message
    struct Message {
        string message;
        string messageId;
        string[] senders;
        string endOfMessage;
    }

    // a mapping that holds: message id => message
    mapping(uint => Message) public messages;

    function getSenders(uint messageId) public view returns (string[] memory) {
        Message storage message = messages[messageId];
        uint sendersCount = message.senders.length;
        string[] memory senders = new string[](sendersCount);

        for (uint i = 0; i < sendersCount; i++) {
            senders[i] = message.senders[i];
        }

        return senders;
    }

    function concatenateStrings(string memory str1, string memory str2) internal pure returns (string memory) {
        return string(abi.encodePacked(str1, str2));
    }

    function getXCallFee(string memory _to, bool _response) public view returns (uint) {
        bytes4 functionSelector = bytes4(keccak256("getFee(string,bool)"));

        (bool success, bytes memory result) = XCALL_BSC.staticcall(abi.encodeWithSelector(functionSelector, _to, _response));
        require(success, "getFee failed");

        return abi.decode(result, (uint));
    }

    function messageHandler(string calldata _from, bytes calldata _data) public payable {
        string memory data = string(_data);
        
        strings.slice memory stringSlice = data.toSlice();
        strings.slice memory delim = ",".toSlice();
        string[] memory ar = new string[](4);     

        for (uint i = 0; i < 4; i++) {
            ar[i] = stringSlice.split(delim).toString();
        }

        string memory method = ar[0];
        string memory msgId = ar[1];
        string memory message = ar[2];
        string memory endOfMessage = ar[3];

        if (keccak256(bytes(method)) == keccak256("makeMessage")){
            Message storage msgInstance = messages[0];

            // concetenate the message
            msgInstance.message = concatenateStrings(msgInstance.message, message);
            msgInstance.messageId = msgId;
            msgInstance.endOfMessage = endOfMessage;

            // add the sender to the senders array
            msgInstance.senders.push(_from);
        }

        // check if end of message is equal to "0x1"
        if (keccak256(bytes(endOfMessage)) == keccak256("0x1")) {
            // get the fee for the xcall  
            uint valueFee = getXCallFee("0x7.icon", false);
            latestFeeCheck = valueFee;

            // create the xcall message
            XCallMessage memory xcallMessage = XCallMessage({
                method: "makeMessage",
                params: new XCallParams[](3)
            });

            // convert the xcall message to bytes
            bytes memory xcalldata = abi.encode(xcallMessage);

            // send xcall message to xcall receiver on berlin
            // IMPORTANT: THIS IS NOT WORKING AS EXPECTED!
            (bool success, ) = XCALL_BSC.call{value: valueFee, gas:100000000}(abi.encodeWithSignature("sendCallMessage(string,bytes)", BTP_ADDRESS_BERLIN_DAPP, xcalldata));
            require(success, "XCall failed");
        }
    }

    function handleCallMessage (
        string calldata _from,
        bytes calldata _data 
    ) external {
        messageHandler(_from, _data); 
    }

    // just receive and hold the funds
    receive() external payable {}

}

