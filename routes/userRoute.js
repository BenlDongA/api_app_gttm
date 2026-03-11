const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const verifyToken = require("../middleware/authMiddleware")



router.post("/register",userController.register)

router.post("/login",userController.login)

router.get("/",verifyToken,userController.getUsers)

router.put("/update",verifyToken,userController.updateUser)

router.delete("/:id",verifyToken,userController.deleteUser)
router.delete("/me",verifyToken,userController.deleteUser)
router.get("/me",verifyToken,userController.getProfile)
router.put("/change-password", verifyToken, userController.changePassword)

module.exports = router