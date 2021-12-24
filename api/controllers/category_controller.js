const helpers = require("../../helpers/helpers");
const {
    saveCategory,
    checkExisitingCategory,
    getCategories,
    getCategoriesById,
    updateCategory,
    deleteCategory
} = require("../services/category_services");



exports._saveCategory = (req, res, next) => {

    const data = req.body;
    checkExisitingCategory(null, data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                helpers._showError(409, res, "This category name already exits.");
            }
            else {
                saveCategory(data, (errs, response) => {
                    if (errs) {
                        helpers._showError(500, res, errs);
                    }
                    else {
                        helpers._showSuccess(201, res, "Category created successfully", response);
                    }
                });
            }
        }
    });
};


exports._getCategories = (req, res, next) => {

    getCategories((err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results) {
                helpers._showAllCategories(200, res, "Catgories found", results);
            }
            else {
                helpers._showError(404, res, "Category not found");
            }
        }
    });
};


exports._getCategoryById = (req, res, next) => {

    const id = req.params.id;
    getCategoriesById(id, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                helpers._showSingleCategory(200, res, "Catgories found", results);
            }
            else {
                helpers._showError(404, res, "Category not found");
            }
        }
    });
};


exports._updateCategory = (req, res, next) => {

    const id = req.params.id;
    const data = req.body;

    checkExisitingCategory(id, data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {

                updateCategory(id, data, (err, results) => {
                    if (err) {
                        helpers._showError(500, res, err);
                    }
                    else {
                        if (results) {
                            helpers._showSuccess(201, res, "Category updated successfully", results);
                        }
                        else {
                            helpers._showError(304, res, "Not modified, something went wrong");
                        }
                    }
                });
            }
            else {
                helpers._showError(404, res, "Category not found");
            }
        }
    });
};


exports._deleteCategory = (req, res, next) => {

    const id = req.params.id;
    
    getCategoriesById(id, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                deleteCategory(id, (err, results) => {
                    if (err) {
                        helpers._showError(500, res, err);
                    }
                    else {
                        if (results) {
                            helpers._showSuccess(200, res, "Category deleted successfully", results);
                        }
                        else {
                            helpers._showError(501, res, "Something went wrong " + err);
                        }
                    }
                });
            }
            else {
                helpers._showError(404, res, "Category cannot be found");
            }
        }
    });
}


