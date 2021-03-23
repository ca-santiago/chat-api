
class DoNotFound {
  constructor() { }
}

class Forbidden {
  constructor() { }
}

class BadRequest {
  constructor(errs) {
    this.errors = errs;
  }
}

class AlreadyExist {
  constructor(errs) {
    this.errors = errs;
  }
}

class Unauthenticated {
  constructor() { }
}

module.exports = {
  AuthUseCasesErrors: {
    BadRequest,
    DoNotFound,
    Forbidden,
    AlreadyExist,
    Unauthenticated,
  }
}