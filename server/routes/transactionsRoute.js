const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

const stripe = require("stripe")(process.env.stripe_key);
const { uuid } = require("uuidv4");

//transfer money one account to another
router.post("/transfer-fund", authMiddleware, async (req, res) => {
  try {
    //save the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    //decrease the senders balance
    await User.findByIdAndUpdate(req.body.sender, {
      $inc: { balance: -req.body.amount },
    });

    //increase the receivers balance receiver
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: req.body.amount },
    });

    res.send({
      message: "transaction successful",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
});

//verify receiver account number
router.post("/verify-account", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if (user) {
      res.send({
        message: "Account verified",
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: "Account not found",
        data: user,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Account not found",
      success: false,
    });
  }
});

//get all transactions for a user
router.post(
  "/get-all-transactions-by-user",
  authMiddleware,
  async (req, res) => {
    try {
      const transaction = await Transaction.find({
        $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
      })
        .sort({ createdAt: -1 })
        .populate("sender")
        .populate("receiver");

      res.send({
        message: "transaction fetched",
        data: transaction,
        success: true,
      });
    } catch (error) {
      res.send({
        message: "transaction not fetched",
        data: error.message,
        success: false,
      });
    }
  }
);

// deposit funds using stripe
router.post("/deposit-funds", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    //create a customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    //create a charge
    const charge = await stripe.charges.create(
      {
        amount: amount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Deposited to Rapid-Pay",
      },
      { idempotencyKey: uuid() }
    );

    //save the transaction
    if (charge.status === "succeeded") {
      const newTransaction = new Transaction({
        sender: req.body.userId,
        receiver: req.body.userId,
        amount: amount,
        type: "deposit",
        reference: "stripe deposit",
        status: "success",
      });
      await newTransaction.save();

      //increase the users balance
      await User.findByIdAndUpdate(req.body.userId, {
        $inc: { balance: amount },
      });
      res.send({
        message: "Transaction successful",
        data: newTransaction,
        success: true,
      });
    } else {
      res.send({
        message: "Transaction failed",
        data: charge,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: "Transaction failed",
      data: error.message,
      success: false,
    });
  }
});

module.exports = router;
