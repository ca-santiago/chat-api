const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: String,
  _id: { type: String },
});

// TODO: To delete?
// AccountSchema.post("findOneAndUpdate", async function (data, next) {
//   const eId = this.get("_id");
//   // DomainEvents.dispatchEventsForAggregate(eId);
// });

// AccountSchema.post("findOneAndDelete", async function (data, next) {
//   const eId = data._id;
//   // DomainEvents.dispatchEventsForAggregate(eId);
// });

const AccountModel = mongoose.model("Account", AccountSchema);
module.exports = {
  AccountModel
}