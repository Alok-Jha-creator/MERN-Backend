const { userRoles, Status } = require("../../config/constants");
const { bannerService } = require("./banner.service");

class BannerController {
    async addBanner(req, res, next) {
        try {
            const data = await bannerService.transformToBannerData(req);
            const banner = await bannerService.storeBanner(data);
            res.json({
                data: banner,
                message: "banner added successfully",
                status: "BANNER_ADDED"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllBanners(req, res, next) {
        try {
            let filter = {};
          
            const data = await bannerService.listAllBannersByFilter(filter);
            res.json({
                data: data,
                message: "banner list",
                status: "BANNER_LIST"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllActiveBanners(req, res, next) {
        try {
            let filter = { status: Status.ACTIVE };
            const data = await bannerService.listAllBannersByFilter(filter);
            res.json({
                data: data,
                message: "banner list",
                status: "BANNER_LIST"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getBannerById(req, res, next) {
        try {
            const bannerDetail = await bannerService.validateBannerDetail(req.params.id);
            res.json({
                data: bannerDetail,
                message: "banner details",
                status: "BANNER_DETAIL"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async updateBannerData(req, res, next) {
        try {
            
            const bannerDetail = await bannerService.validateBannerDetail(req.params.id);
            const updateData = await bannerService.transformToBannerUpdateData(req, bannerDetail);
            const updated = await bannerService.updateBanner(updateData, { _id: bannerDetail._id });
            
            res.json({
                data: updated,
                message: "banner updated successfully",
                status: "BANNER_UPDATED"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async deleteBannerById(req, res, next) {
        try {
            const bannerDetail = await bannerService.validateBannerDetail(req.params.id, req.loggedInUser);
            const del = await bannerService.deleteDataById(bannerDetail._id);
            res.json({
                data: del,
                message: "banner deleted successfully",
                status: "BANNER_DELETED"
            })
        } catch (exception) {
            next(exception)
        }
    }
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;