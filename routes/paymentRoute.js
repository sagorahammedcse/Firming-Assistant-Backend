
const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { processPayment, sendStripApiKey } = require("../controllers/paymentController");


const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripApiKey);



module.exports = router;