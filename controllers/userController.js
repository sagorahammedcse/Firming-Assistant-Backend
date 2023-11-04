

//register new user 
const User = require("../model/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");

exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "sample id",
            url: "sample url",
        }
    });
    sendToken(user, 201, res);

});


// login controller 

exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("অনুগ্রহ করে আপনার সঠিক ই-মেইল এবং পাসওয়ার্ড দিন"));

    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("এই ই-মেইল দিয়ে আপনাকে খুজে পাওয়া যাচ্ছে না,অনুগ্রহ করে সঠিক ই-মেইল এবং পাসওয়ার্ড দিন"));

    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("এই ই-মেইল দিয়ে আপনাকে খুজে পাওয়া যাচ্ছে না,অনুগ্রহ করে সঠিক ই-মেইল এবং পাসওয়ার্ড দিন"));
    }
    sendToken(user, 200, res);
});

//logout user 

exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true, //this method only work localhost because localhost is not secure and it work with http not https
        // secure:true //this function only use for https
    });
    res.status(200).json({
        success: true,
        message: "Logged out",
    })
});

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })
})