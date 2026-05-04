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
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;