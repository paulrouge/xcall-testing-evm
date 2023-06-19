I've been struggling to get a xcall call done by a contract to work. 

Like I said earlier my plan is to have a function that receives data from Berlin on BSC and concatenates it. This is working, the BSC contract keeps track of messages and the senders addresses.

How ever the last part, sending the complete data back to Berlin from BSC is not working. The logs on BSC arent very helpful either.

This is the function:

(bool success, ) = XCALL_BSC.call{value: valueFee, gas:1000000}(abi.encodeWithSignature("sendCallMessage(string,bytes)", BTP_ADDRESS_BERLIN_DAPP, xcalldata));
require(success, "XCall failed");

So tomorrow morning I will have either solve it or change my approach.