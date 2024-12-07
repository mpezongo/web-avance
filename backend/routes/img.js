const express = require("express");
const router = express.Router();
const sendImgController = require('../controllers/img')

router.post("/", sendImgController.addProductImg)

module.exports = router