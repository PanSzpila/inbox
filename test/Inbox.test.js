import assert from "assert";
import ganache from "ganache";
import { beforeEach } from "mocha";
import { Web3 } from "web3";
import { abiInterface, bytecode } from "../compile";

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //use one of those accounts to deploy
  inbox = await new web3.eth.Contract(JSON.parse(abiInterface))
    .deploy({ data: bytecode, arguments: ["siemanko!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});
