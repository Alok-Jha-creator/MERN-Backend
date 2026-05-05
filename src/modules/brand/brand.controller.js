const { userRoles, Status } = require("../../config/constants");
const { brandService } = require("./brand.service");

class BrandController {
    async addBrand(req, res, next) {
        try {
            console.log("LoggedInUser>>>", req.LoggedInUser); // ← ADD THIS
        console.log("Headers>>>", req.headers.authorization); // ← ADD THIS
            const data = await brandService.transformToBrandData(req);
            const brand = await brandService.storeBrand(data);
            res.json({
                data: brand,
                message: "brand added successfully",
                status: "BRAND_ADDED"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllBrands(req, res, next) {
        try {
            let filter = {};
            if (req.LoggedInUser.role !== userRoles.ADMIN) {
                filter = {
                    ...filter,
                    createdBy: req.loggedInUser._id
                }
            }
            const data = await brandService.listAllBrandsByFilter(filter);
            res.json({
                data: data,
                message: "brand list",
                status: "BRAND_LIST"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllActiveBrands(req, res, next) {
        try {
            let filter = { status: Status.ACTIVE };
            const data = await brandService.listAllBrandsByFilter(filter);
            res.json({
                data: data,
                message: "brand list",
                status: "BRAND_LIST"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getBrandById(req, res, next) {
        try {
            const brandDetail = await brandService.validateBrandDetail(req.params.id, req.LoggedInUser);
            res.json({
                data: brandDetail,
                message: "brand details",
                status: "BRAND_DETAIL"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async updateBrandData(req, res, next) {
        try {
            console.log("LoggedInUser>>>", req.LoggedInUser) 
            const brandDetail = await brandService.validateBrandDetail(req.params.id, req.LoggedInUser);
            const updateData = await brandService.transformToBrandUpdateData(req, brandDetail);
            const updated = await brandService.updateBrand(updateData, { _id: brandDetail._id });
            
            res.json({
                data: updated,
                message: "brand updated successfully",
                status: "BRAND_UPDATED"
            })
        } catch (exception) {
            next(exception)
        }
    }
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;