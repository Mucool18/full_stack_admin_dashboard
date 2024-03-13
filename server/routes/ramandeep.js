const express = require("express");
const router = express.Router();
const {getName} = require("../controllers/ramandeep")

router.get("/name", getName);

module.exports = router;