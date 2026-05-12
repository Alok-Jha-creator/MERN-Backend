const { userRoles } = require('../../config/constants');
const { loginCheck } = require('../../middleware/auth.middleware');
const uploader = require('../../middleware/uploader.middleware');
const { validateBodyData } = require('../../middleware/validator.middleware');
const { BannerDataDTO } = require('./banner.validator');
const bannerCtrl = require('./banner.controller');



const bannerRouter = require('express').Router();
bannerRouter.get("/for-home",bannerCtrl.getAllActiveBanners);
//CRUD
 bannerRouter.post('/',loginCheck([userRoles.ADMIN]),uploader().single('image'),validateBodyData(BannerDataDTO),bannerCtrl.addBanner);
 bannerRouter.get('/',loginCheck([userRoles.ADMIN]),bannerCtrl.getAllBanners);
 bannerRouter.get('/:id',loginCheck([userRoles.ADMIN]),bannerCtrl.getBannerById);
 bannerRouter.put('/:id',loginCheck([userRoles.ADMIN]),uploader().single('image'),validateBodyData(BannerDataDTO),bannerCtrl.updateBannerData)
 bannerRouter.delete('/:id',loginCheck([userRoles.ADMIN]),bannerCtrl.deleteBannerById)

module.exports = bannerRouter;