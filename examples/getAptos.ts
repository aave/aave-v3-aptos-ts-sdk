import { Account, AccountAddress, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { AptosProvider } from "../src/clients";
import { testnetConfig } from "../src/configs/testnet";

const aptFunderPrivateKey = "0x0";
const addressesToFund = ["0x0"].map((addr) => AccountAddress.fromString(addr));
const fundAmount = BigInt(0.5);

(async () => {
  // global aptos provider
  const aptosProvider = new AptosProvider(testnetConfig);

  try {
    // set the tx sender
    const aptFunderAccount = Account.fromPrivateKey({
      privateKey: new Ed25519PrivateKey(aptFunderPrivateKey),
    });

    // get details for each underlying token
    for (const addressToFund of addressesToFund) {
      const transaction = await aptosProvider
        .getAptos()
        .transferCoinTransaction({
          sender: aptFunderAccount.accountAddress,
          recipient: addressToFund,
          amount: fundAmount,
        });
      const pendingTransaction = await aptosProvider
        .getAptos()
        .signAndSubmitTransaction({ signer: aptFunderAccount, transaction });
      console.log(`User addresses ${addressToFund.toString()} funded with ${fundAmount.toString()} APT
      Tx Hash = ${pendingTransaction.hash}`);
    }
  } catch (ex) {
    console.error("Expection = ", ex);
  }
})();
