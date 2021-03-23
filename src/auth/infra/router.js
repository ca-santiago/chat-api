const express = require("express");

const { CreateAccountController } = require("./controllers/CreateAccount");
const { DeleteAccountController } = require("./controllers/DeleteAccountController");
const { LoginController } = require("./controllers/Login");
const { VerifyCredentialsController } = require("./controllers/VerifyCredentials");
const { VerifyCredentials } = require("./middlewares/VerifyCredentials");

const AuthRouter = express.Router();

AuthRouter.get('/ping', (req, res) => {
  res.send('poong');
});

AuthRouter.post("/", CreateAccountController);

AuthRouter.post("/login", LoginController);

AuthRouter.post("/verifyCredentials", VerifyCredentialsController);

AuthRouter.delete("/", VerifyCredentials, DeleteAccountController);

module.exports = { AuthRouter };
