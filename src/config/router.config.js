const router = require("express").Router();
const authRouter = require("../modules/auth/auth.router");
const frontRouter = require("../modules/front/front.router");
const bannerRouter = require("../modules/banner/banner.router");
const brandRouter = require("../modules/brand/brand.router");
const categoryRouter = require("../modules/category/category.router");
const orderRouter = require("../modules/order/order.router");
const productsRouter = require("../modules/products/products.router");
const transactionRouter = require("../modules/transaction/transaction.router");
const userRouter = require("../modules/user/user.router");


/* Routes Start */
router.use("/auth", authRouter);
router.use("/front", frontRouter);
// router.use("/banner", bannerRouter);
router.use("/brand", brandRouter);
router.use("/categories", categoryRouter);
// router.use("/products", productsRouter);
// router.use("/transaction", transactionRouter);
// router.use("/user", userRouter);
/* Routes End */
module.exports=router;