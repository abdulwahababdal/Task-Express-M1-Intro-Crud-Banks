const express = require("express");
const { v4: uuidv4 } = require("uuid");
const accounts = require("./accounts");
const app = express();
app.use(express.json());

app.get("/accounts", (req, res) => {
  res.json(accounts);
});

app.get("/accounts/:accountId", (req, res) => {
  const { accountId } = req.params;
  const account = accounts.find((account) => account.id === +accountId);
  res.json(account);
});

app.post("/accounts", (req, res) => {
  const newAcc = { ...req.body, id: uuidv4(), funds: 0 };
  accounts.unshift(newAcc);
  res.status(201).json(newAcc);
});

app.put("/accounts/:accountId", (req, res) => {
  const foundAcc = accounts.find(
    (account) => account.id === parseInt(req.params.accountId)
  );
  if (!foundAcc) res.status(404).json({ message: "Account not found" });
  const { username, funds } = req.body;
  if (!username || !funds) res.status(400).json({ message: "Bad Request" });
  foundAcc.username = username;
  foundAcc.funds = funds;
  res.status(200).json(foundAcc);
});

app.delete("/accounts/:accountId", (req, res) => {
  const foundAcc = accounts.find(
    (account) => account.id === parseInt(req.params.accountId)
  );
  if (!foundAcc) res.status(404).json({ message: "Account not found" });
  const accountIndex = accounts.findIndex(
    (account) => account.id === req.params.accountId
  );

  accounts.splice(accountIndex, 1);
  res.status(204).end();
});
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
