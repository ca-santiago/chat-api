const { v4 } = require("uuid");
const { left, right } = require("../../core/Either");
const { Account } = require("../domain/Account");
const { validateEmail } = require("../domain/Email");
const { validateName } = require("../domain/Name");
const { AccountMongoRepo } = require("../repo/mongo");
const {
  validateNewPassword,
  hashPassword,
} = require("../domain/Password");
const { AuthUseCasesErrors } = require("./Errors");

async function CreateAccountUseCase({ email, password, name }, id) {
  const exist = await AccountMongoRepo.exist(email);
  if (!!exist)
    return left(
      new AuthUseCasesErrors.AlreadyExist(['Email already registered'])
    );

  // Vaidating account values
  const emailOrErr = validateEmail(email);
  const passOrErr = validateNewPassword(password);
  const nameOrErr = validateName(name);
  const validationRes = [emailOrErr, passOrErr, nameOrErr];

  const errs = validationRes.filter((val) => val.label === 'left');

  if (errs.length > 0)
    return left(
      new AuthUseCasesErrors.BadRequest(errs.map(e => e.value[0]))
    );

  let finalPass = passOrErr.value;
  if (!id && passOrErr.label == 'right')
    finalPass = hashPassword(finalPass);

  // Creating account
  const accInstance = Account.create({
    email: emailOrErr.value,
    password: finalPass,
    id: id || v4(),
    name: nameOrErr.value,
  });

  // Saving
  await AccountMongoRepo.save(accInstance);
  return right(null);
}

module.exports = {
  CreateAccountUseCase
}
