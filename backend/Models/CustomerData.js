const mongoose = require('mongoose');

//  CartSchema
const CartSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    image: { type: [String], required: true },
    product: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    selectedSize: { type: String, required: true }
}, { _id: false });

//  customerSchema
const customerSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: Number, required: true },
        country: { type: String, required: true },
    },
    cart: [CartSchema],
    paymentMethod: { type: String, required: true },
    subTotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }

});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
