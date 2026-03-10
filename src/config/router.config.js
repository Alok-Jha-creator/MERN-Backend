const router = require("express").Router();
const authRouter = require("../modules/auth/auth.router");
const frontRouter = require("../modules/front/front.router")
router.use("/auth", authRouter)
router.use("/front", frontRouter)


module.exports=router;