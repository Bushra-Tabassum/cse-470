const Product = require('./../models/productModel');
const User = require('./../models/userModel');
const catchAsync = require("./../utils/catchAsync");

exports.addProduct = catchAsync(async (req, res) => {
    await Product.create({
        name: req.body.name,
        description: req.body.description,
        startingPrice: req.body.startingPrice,
        seller: (await User.findById(req.session.user)).name
    });
    res.redirect('/');
});
exports.getAllProduct = catchAsync(async (req, res) => {
    const data = await Product.find();
    res.render('./../views/dashboard.ejs', {data, title: "Dashboard"});
})

exports.bid = catchAsync(async (req, res) => {
    const product = await Product.findById(req.body._id);
    const price = Number(req.body.bid);

    if (price > product.startingPrice && price > product.bid) {
        console.log("w")
        await Product.findByIdAndUpdate({_id: req.body._id}, {
            bidder: (await User.findById(req.session.user)).name,
            bid: price
        }, {
            new: true,
            runValidators: true
        })
    }
    res.redirect('/');
});