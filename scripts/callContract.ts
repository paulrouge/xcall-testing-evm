import { ethers } from 'hardhat';

// const XCALL_ADDRESS_SEPOLIA = "0x9B68bd3a04Ff138CaFfFe6D96Bc330c699F34901"
const XCALL_ADDRESS_BSC_TEST = "0x6193c0b12116c4963594761d859571b9950a8686"
// const XCALL_ADDRESS_LOCAL = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82"

const DAPP = "0xd2C85d8D6C3c04A868dfdDFf24024e40f5ef7ad7"

async function main() {

    const my_xcall_contract = await ethers.getContractFactory("CallService")
    const xcall_contract = my_xcall_contract.attach(XCALL_ADDRESS_BSC_TEST)

    const result = await xcall_contract.executeCall(291,{gasLimit: 1000000})
    console.log(result.hash)

    // testing the sendCallMessage directly on the contract
    // false to bytes
    // const toBytes = ethers.utils.toUtf8Bytes("false")
    // const result1 = await xcall_contract.sendCallMessage("0x7.icon", "0x6d616b654d6573736167652c302c48656c6c6f2066726f6d2049434f4e204265726c696e20312e2c46616c7365", toBytes, {gasLimit: 10000000})
    // console.log(result1.hash)


    const my_call_contract = await ethers.getContractFactory("XCallTestContract")
    const call_contract = my_call_contract.attach(DAPP)
    
    // const logString = await call_contract.logString()
    // console.log("log string: ", logString.toString())

    // const msg = await call_contract.messages(0)
    // console.log("msg: ", msg.toString())
    // const senders = await call_contract.getSenders(0);
    // console.log("Senders: ", senders);
    // const latestFee = await call_contract.latestFeeCheck();
    // console.log("latestFee: ", latestFee.toString());
    
    // const getxCallFee = await call_contract.getXCallFee("0x7.icon", false);
    // console.log("getxCallFee: ", getxCallFee.toString());

	// const _to = "btp://0x61.bsc/0xaAB89A64d6D9D78C22693F551e73AF12E75B2B8c"
	// const _data =  "0x6d616b654d6573736167652c302c48656c6c6f2066726f6d2049434f4e204265726c696e20312e2c46616c7365"

    // const result2 = await call_contract.handleCallMessage(_to, _data, {gasLimit: 10000000})
    // console.log(result2)
}

main()
