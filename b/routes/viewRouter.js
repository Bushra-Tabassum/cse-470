const productController = require('./../controllers/productController');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(productController.getAllProduct)
    .post(productController.bid)
router.route('/addProduct').get((req, res) => {
    res.render('addProduct', {title: "Add Product"})
}).post(productController.addProduct);

// router.route('/:id')
//     .get(productController.productPage)
module.exports = router;