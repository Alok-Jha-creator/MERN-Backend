const { userRoles, Status } = require("../../config/constants");
const { categoryService } = require("./category.service");

class CategoryController {
    async addCategory(req, res, next) {
        try {
            const data = await categoryService.transformToCategoryData(req);
            const category = await categoryService.storeCategory(data);
            res.json({
                data: category,
                message: "category added successfully",
                status: "CATEGORY_ADDED"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllCategories(req, res, next) {
        try {
            let filter = {};
            if (req.loggedInUser.role !== userRoles.ADMIN) {
                filter = {
                    ...filter,
                    createdBy: req.loggedInUser._id
                }
            }
            const data = await categoryService.listAllCategoriesByFilter(filter);
            res.json({
                data: data,
                message: "category list",
                status: "CATEGORY_LIST"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllActiveCategories(req, res, next) {
        try {
            let filter = { status: Status.ACTIVE };
            const data = await categoryService.listAllCategoriesByFilter(filter);
            res.json({
                data: data,
                message: "category list",
                status: "CATEGORY_LIST"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const categoryDetail = await categoryService.validateCategoryDetail(req.params.id, req.loggedInUser);
            res.json({
                data: categoryDetail,
                message: "category details",
                status: "CATEGORY_DETAIL"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async updateCategoryData(req, res, next) {
        try {
            
            const categoryDetail = await categoryService.validateCategoryDetail(req.params.id, req.loggedInUser);
            const updateData = await categoryService.transformToCategoryUpdateData(req, categoryDetail);
            const updated = await categoryService.updateCategory(updateData, { _id: categoryDetail._id });
            
            res.json({
                data: updated,
                message: "category updated successfully",
                status: "CATEGORY_UPDATED"
            })
        } catch (exception) {
            next(exception)
        }
    }

    async deleteCategoryById(req, res, next) {
        try {
            const categoryDetail = await categoryService.validateCategoryDetail(req.params.id, req.loggedInUser);
            const del = await categoryService.deleteDataById(categoryDetail._id);
            res.json({
                data: del,
                message: "category deleted successfully",
                status: "CATEGORY_DELETED"
            })
        } catch (exception) {
            next(exception)
        }
    }
}

const categoryCtrl = new CategoryController();
module.exports = categoryCtrl;