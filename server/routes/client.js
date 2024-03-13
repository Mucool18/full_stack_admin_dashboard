const express = require("express");
const router = express.Router();
const {getProducts, getCustomers, getTransactions, getGeography } = require("../controllers/client")

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

 module.exports = router;