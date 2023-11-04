const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apiFetures");
const ErrorHandler = require("../utils/ErrorHandler");

// create product 
exports.createProduct = catchAsyncError(async (req, res, next) => {

    // add cloudniry here 

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });

});

exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        resultPerPage,
        productsCount,
        filteredProductsCount,
    });
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {


    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });

});

// update product by admin 
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,
        req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        product,
    })
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
})

