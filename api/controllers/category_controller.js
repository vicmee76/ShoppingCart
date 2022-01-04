const {validationResult } = require('express-validator');
const helpers = require("../../helpers/helpers");
const {
    saveCategory,
    checkExisitingCategory,
    getCategories,
    getCategoriesById,
    updateCategory,
    deleteCategory,
    getCategoryProducts
} = require("../services/category_services");


// create new category
exports._saveCategory = async (req, res) => {
    try {
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const check = await checkExisitingCategory(null, data);
      
        if (check && check.length > 0) {
            helpers._showError(409, res, "This category name already exits.");
        }
        else {
            const save = await saveCategory(data);
            if (save) {
                helpers._showSuccess(201, res, "Category created successfully", save);
            }
            else {
                helpers._showError(500, res, "Something went wrong");
            }
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
};


// get all categories
exports._getCategories = async (req, res) => {

    try {
        const get = await getCategories();
        if (get && get.length > 0) {
            helpers._showAllCategories(200, res, "Catgories found", get);
        }
        else {
            helpers._showError(404, res, "Category not found");
        }
    }
    catch (e) {
        helpers._showError(500, res, e);
    }
};



// get category by category id
exports._getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const get = await getCategoriesById(categoryId);
        
        if (get) {
            helpers._showSingleCategory(200, res, "Catgories found", get);
        }
        else {
            helpers._showError(404, res, "Category not found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
};


// get products in a category
exports._getCategoryProducts = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const cat = await getCategoryProducts(categoryId);

        if (cat && cat.length > 0) {
            helpers._showSingleCategory(200, res, "Products found for this category", cat);
        }
        else {
            helpers._showError(404, res, "Products for this category not found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
};



// update a category details
exports._updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const check = await checkExisitingCategory(categoryId, data);

        if (check && check.length > 0) {
            const update = await updateCategory(categoryId, data);
            if (update) {
                helpers._showSuccess(201, res, "Category updated successfully", update);
            }
            else {
                helpers._showError(304, res, "Not modified, something went wrong");
            }
        }
        else {
            helpers._showError(404, res, "Category not found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
};


// delete category
exports._deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const get = await getCategoriesById(categoryId);

        if (get && get.length > 0) {
            const del = await deleteCategory(categoryId);
            if (del) {
                helpers._showSuccess(200, res, "Category deleted successfully", del);
            }
            else {
                helpers._showError(501, res, "Something went wrong ");
            }
        }
        else {
            helpers._showError(404, res, "Category cannot be found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
}


