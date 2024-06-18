const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

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

module.exports = router;
