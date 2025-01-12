const express = require("express")
const router = express.Router();
const usersController = require("../controllers/users")

router.post("/register", usersController.register)
router.post("/login", usersController.login)
router.post("/logout", usersController.logout)
router.post("/verify_admin", usersController.verify_admin)
router.get("/", usersController.getUsers)

module.exports = router