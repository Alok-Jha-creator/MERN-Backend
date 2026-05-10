const router = require("express").Router();
const authRouter = require("../modules/auth/auth.router");
const frontRouter = require("../modules/front/front.router");
const brandRouter = require("../modules/brand/brand.router");
const categoryRouter = require("../modules/category/category.router");
const orderRouter = require("../modules/order/order.router");
const productRouter = require("../modules/product/product.router");
//const transactionRouter = require("../modules/transaction/transaction.router");
const userRouter = require("../modules/user/user.router");
const bannerRouter = require("../modules/banners/banner.router");


/* Routes Start */
router.use("/auth", authRouter);
router.use("/front", frontRouter);
router.use("/brand", brandRouter);
router.use("/categories", categoryRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);
router.use("/order", orderRouter);
// router.use("/transaction", transactionRouter);
 router.use("/banner", bannerRouter);
/* Routes End */
module.exports=router;