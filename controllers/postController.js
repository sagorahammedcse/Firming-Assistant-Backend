const catchAsyncError = require("../middleware/catchAsyncError");
const Post = require("../model/postModel");
const ErrorHandler = require("../utils/ErrorHandler");
const ApiFeatures = require("../utils/apiFetures");


// create post 
exports.createPost = catchAsyncError(async (req, res, next) => {

    // add cloudniry 
    const post = await Post.create(req.body);
    res.status(201).json({
        success: true,
        post
    })

});
// get all post
exports.getAllPost = catchAsyncError(async (req, res, next) => {

    const resultPerPage = 8;
    const postCount = await Post.countDocuments();
    const apiFeature = new ApiFeatures(Post.find(), req.query)
        .search()
        .filter();
    let posts = await apiFeature.query;
    let filteredPostCount = posts.length;
    apiFeature.pagination(resultPerPage);

    posts = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        posts,
        resultPerPage,
        filteredPostCount,
        postCount,
    })

})

// get post details 
exports.getPostDetails = catchAsyncError(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next(new ErrorHandler("Post not found!", 404));
    }
    res.status(200).json({
        success: true,
        post
    })
});

// update post 
exports.updatePost = catchAsyncError(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
    if (!post) {
        return next(new ErrorHandler("Post not found!", 404))
    }
    post = await Post.findByIdAndUpdate(req.params.id,
        req.body, {

        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        post,
    })
});

exports.deletePost = catchAsyncError(async (req, res, next) => {

    const post = await Post.findById(req.params.id);

    if (!post) {

        return next(new ErrorHandler("Post not found!", 404));
    }
    await Post.deleteOne();
    res.status(200).json({
        success: true,
        message: "Post delete successfully"
    })

})