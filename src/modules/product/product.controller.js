const { userRoles, Status } = require("../../config/constants");
const { productService } = require("./product.service");

class ProductController {
    async addProduct(req, res, next) {
        try {
            const data = await productService.transformToProductData(req);
            const product = await productService.storeProduct(data);
            res.json({
                data: product,
                message: "product added successfully",
                status: "PRODUCT_ADDED"
            })
        } catch (exception) {
            next(exception)
        }
    }
    async getAllProducts(req, res, next) {
        try {
            let filter = {};
            if (req.loggedInUser.role !== userRoles.ADMIN) {
                filter = {
                    ...filter,
                    createdBy: req.loggedInUser._id
                }
            }
            if(req.query.search){
                filter ={
                    ...filter,
                    $or:[{
                    name: new RegExp(req.query.search, 'i'),
                    description: new RegExp(req.query.search, 'i')
                    }
                    ]
                }
            }
            if(req.query.status){
                filter = {
                    ...filter,
                    status: req.query.status
                }
            }
            const {data,pagination} = await productService.listAllProductsByFilter(filter,req.query);
            res.json({
                data: data,
                message: "product list",
                status: "PRODUCT_LIST",
                meta:{pagination}
            })
        } catch (exception) {
            next(exception)
        }
    }
    async getAllActiveProducts(req, res, next) {
        try {
            let filter = { status: Status.ACTIVE };
            const {data,pagination} = await productService.listAllProductsByFilter(filter,req.query);
            res.json({
                data: data,
                message: "product list",
                status: "PRODUCT_LIST",
                meta:{pagination}
            })
        } catch (exception) {
            next(exception)
        }
    }
    async getProductById(req, res, next) {
        try {
            const productDetail = await productService.validateProductDetail(req.params.id, req.loggedInUser);
            res.json({
                data: productDetail,
                message: "product details",
                status: "PRODUCT_DETAIL"
            })
        } catch (exception) {
            next(exception)
        }
    }
    async updateProductData(req, res, next) {
        try {
            
            const productDetail = await productService.validateProductDetail(req.params.id, req.loggedInUser);
            const updateData = await productService.transformToProductUpdateData(req, productDetail);
            const updated = await productService.updateProduct(updateData, { _id: productDetail._id });
            
            res.json({
                data: updated,
                message: "product updated successfully",
                status: "PRODUCT_UPDATED"
            })
        } catch (exception) {
            next(exception)
        }
    }
    async deleteProductById(req, res, next) {
        try {
            const productDetail = await productService.validateProductDetail(req.params.id, req.loggedInUser);
            const del = await productService.deleteDataById(productDetail._id);
            res.json({
                data: del,
                message: "product deleted successfully",
                status: "PRODUCT_DELETED"
            })
        } catch (exception) {
            next(exception)
        }
    }
}

const productCtrl = new ProductController();
module.exports = productCtrl;