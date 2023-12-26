import assert from "assert";
import ganache from "ganache";
import { beforeEach, it } from "mocha";
import { Web3, net } from "web3";
import { abiInterface, bytecode } from "../compile.js";

const web3 = new Web3(ganache.provider());
const INITIAL_MESSAGE = "Siemanko!";

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  //use one of those accounts to deploy
  inbox = await new web3.eth.Contract(JSON.parse(abiInterface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  });

  it("can chabge the message", async () => {
    const newMessage = "zmieniony message";
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});
