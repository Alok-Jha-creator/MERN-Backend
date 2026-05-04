const { userRoles, Status } = require("../../config/constants");
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
        res.json({
            data: data,
            message: "brand list",
            status: "BRAND_LIST"
        })
        } catch (exception) {
            next(exception)
            
        }
     }

    async getAllActiveBrands(req,res,next){
        try {
              let filter ={
                status:Status.ACTIVE
              };
         const data = await brandService.listAllBrandsByFilter (filter);
         res.json({
             data: data,
             message: "brand list",
             status: "BRAND_LIST"
         })
         } catch (exception) {
             next(exception)
             
         }
    }

    async getBrandById(req, res, next){
        try {
            const id = req.params.id;
            const brandDetail=await brandService.getSingleRowByFilter({_id:id});
            if(!brandDetail) throw {code:404,message:"Brand not found",status:"BRAND_NOT_FOUND"}
        } catch (exception) {
             next(exception)
            
        }
    }
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;