
const catchAsyncError = require("../middleware/catchAsyncError");



const stripe = require("stripe")('sk_test_51Nxu4pLhoR75Yj9WQNGUARvSfynoTlGDDMcpvNObYAsQfZX52L1byTdwNLB3SdWp7nnPE6eWWuBGiBagJNWtwzw900Mk7PZ8DS');
exports.processPayment = catchAsyncError(async(req,res,next) =>{
    // console.log("Received API key from frontend:", req.headers.authorization);
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"usd",
        metadata:{
            company:"Panda Commerce",
        },
    });
    res.status(200)
    .json({success:true,client_secret:myPayment.client_secret});
    //  console.log(myPayment.client_secret)
});

exports.sendStripApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
})