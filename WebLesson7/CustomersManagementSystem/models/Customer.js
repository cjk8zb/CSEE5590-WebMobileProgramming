var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  customerID: Number,
  name: {
    first: String,
    last: String
  },
  birthday: String,
  gender: String,
  lastContact: String,
  customerLifetimeValue: Number,
});

/**
 *
 * @class Customer
 * @typeof Model<CustomerSchema>
 */
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
