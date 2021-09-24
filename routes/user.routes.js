const router = require('express').Router()
const authController = require("../controllers/auth.controller")
const userController=require("../controllers/user.controller")


//authentification
router.post('/register', authController.signUp);


//user-database
router.get("/",userController.getAllUSers)
router.get("/:id",userController.userInfo)
router.put("/put/:id",userController.updateUser)
router.delete("/delete/:id",userController.deleteUser)
module.exports = router