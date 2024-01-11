// run the file: node --env-file=.env deploy.js

import HDWalletProvider from "@truffle/hdwallet-provider";
import { Web3 } from "web3";
import { abiInterface, bytecode } from "./compile.js";
//updated web3 and hdwallet-provider imports added for convenience

const provider = new HDWalletProvider(
  process.env.ACCOUNT_SRP,
  process.env.NETWORK_URL + process.env.NETWORK_API_KEY
);
const web3 = new Web3(provider);
// deploy code will go here

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(abiInterface))
    .deploy({ data: bytecode, arguments: ["haj der!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
