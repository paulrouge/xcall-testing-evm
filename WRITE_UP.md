# xCall Focus Testing - Recap  
The following is a recap on my findings during the xCall focus testing.

## Setting up a local environment
I lost a lot of time on setting up a testing environment. Initially I was planning to get a local instance of an EVM and ICON chain running. But I was not able to set up a practical environment this way. Main issues where:

    - I could not get a tracker working for the local ICON chain,
    - I could not get a tracker working for the local EVM chain, 
    - After quite some time I found out that the ICON Chain was not in debug mode, so I could not debug failed transactions.

For testing the tracker is extremely important, at least in my workflow. All of this took my several days, during which I did not make any progress on the actual testing. So at some point I decided that I would need to set up my environment to work with the ICON testnet and the BSC testnet. This was a lot easier to set up, and I was able to get a working environment within a few hours.

## Testing the xCall functionality
I started trying to get a xCall transaction from Berlin to Sepolia. It wasn't working and I couldn't figure out why. This was before I got any succesfull transaction, so I didn't know if I was doing it wrong or something else (out of my control) was wrong. After another day or so it appeared that the relay was not working.

Honestly this was quite frustrating. I have spend a lot of time now on a lot of thing other than actually testing xCall. But that frustation went straigth out when I eventually made my first successful xCall transaction. It was a great feeling to see it working.

So now I could start working on more ellaborate testcases. I decided I wanted to try to make a contract that stored and concatonate data coming in from a other chain. And could also send the collected data back to the source chain.

The contract I made for this is [here](./contracts/XCallTestContract.sol). The function used for trying to do the above mentioned is called `messageHandler`. It's a bit of a hassle to get some sort of JSON utitly with Solidty so I decided that the function would handle a string separated with comma's as input. The function would then split the string and use the seperate parts as input for the function.

If the first part of the string is 'makeMessage' the a message object is created or updated on the contract. The object had a id, the message sent is concatenated to the existing message of that message object. And the BTP address of the sender is appended to the list of sender on the message object. So the message object on the contract would hold a list of all the messages sent to it, and a list of all the BTP addresses that sent a message to it.

This was more or less working, at least enough to have the messages/data and BTP addresses been registered. What I could not get to work was sending that message object back to Berlin. On index 3 of the comma separated string was a boolean value (as a string 0x0 or 0x1) that would determine an 'endOfMessage' value. If it is 0x1 it should send out the message object to Berlin. But I could not get this to work. I tried a lot of different things, but I could not get the message object to be sent back to Berlin.

This is the part of the function that failed:

```solidity
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
```

## Rollbacks
All of this had taken me quite some time. I think I had 1 or 2 days left now and decided to try and test the rollback functionality. I had quite a bit of trouble with this. Mostly because the lack of (I guess) documentation on the how and why of 'rollbacks'. For example, it took me quite some time before I learned rollbacks can not be instantiated by EOA accounts.

To me it would have been helpful to have some explanation, maybe with pseudo code, on the rollback topic. I think this would have saved me a lot of time. This was also the point I ran out of time. I would really like to have more info / explanation on the rollback topic. I think it would be very helpful and even necessary to have this for the next stage of the xCall testing.

