
class Account {
  constructor(args) {
    this.id = args.id;
    this.password = args.password;
    this.email = args.email;
    this._name = args.name;
  }

  static create({ password, name, email, id }) {
    return new Account({ password, name, email, id });
  }
}

module.exports = {
  Account
}
