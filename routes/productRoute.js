const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductDetails,
    updateProduct,
    deleteProduct
} = require('../controllers/productContoller');

const router = express.Router();

router.route("/product/new").post(createProduct);

// get all products 
router.route("/products").get(getAllProducts);
// get products details 
router.route("/product/:id").get(getProductDetails);
// update product by admin 
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;