const{Router}=require("express");
const{register, login, loginAdmin}=require("../controller/userController");
const isAdmin=require("../middleWere/isAdmin")
const isAuth=require("../middleWere/isAuth")

const router=Router();

router.post("/register",register);
router.post("/login", isAuth,login);
router.post("/loginAdmin", isAdmin,loginAdmin);

module.exports=router

