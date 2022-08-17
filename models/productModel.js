const mongoose = require('mongoose');
const productScema = new mongoose.Schema({
    name: String,
    description: String,
    startingPrice: Number,
    seller: String,
    bid: {
        type: Number,
        default: 0
    },
    bidder: {
        type: String,
        default: "None"
    }
});
const Product = mongoose.model('Product', productScema);
module.exports = Product