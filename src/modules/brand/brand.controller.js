const { userRoles } = require("../../config/constants");
const { brandService } = require("./brand.service");

class BrandController{
    async addBrand(req, res, next){
        try {
            const data =await brandService.transformToBrandData(req); 
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

    async getAllBrands(req, res, next){
        try {
           let filter ={};
           if(req.loggedInUser.role !== userRoles.ADMIN){
            filter = {
                ...filter,
                createdBy: req.loggedInUser._id
            }
           }
        const data = await brandService.listAllBrandsByFilter (filter);
        } catch (exception) {
            next(exception)
            
        }
     }
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;