
exports._showError = (code, res, err) => {
    return res.status(code).json({
        success: false,
        messgae: "Error : " + err
    });
};


exports._showSuccess = (code, res, msg, response = null, token = null) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response,
        token: token
    });
};


exports._showAllUsers = (code, res, msg, response) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response.map(x => {
            return {
                UserId: x.UserId,
                Firstname: x.FirstName,
                Email: x.Email,
                ViewRecord: {
                    type: "GET",
                    link: "http://localhost:4000/api/users/view/" + x.UserId,
                },
                EditRecord: {
                    type: "PUT",
                    link: "http://localhost:4000/api/users/edit/" + x.UserId,
                },
                DeleteRecord: {
                    type: "DELETE",
                    link: "http://localhost:4000/api/users/delete/" + x.UserId
                }
            }
        })
    });
};


exports._showSingleUsers = (code, res, msg, response) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response.map(x => {
            return {
                UserId: x.UserId,
                Email: x.Email,
                FirstName: x.FirstName,
                LastName: x.LastName,
                Phone: x.Phone,
                Gender: x.Gender,
                Image: x.ImgUrl,
                CreatedAt: x.CreatedAt,
                UpdatedAt: x.UpdatedAt,
                EditRecord: {
                    type: "PUT",
                    link: "http://localhost:4000/api/users/edit/" + x.UserId,
                },
                DeleteRecord: {
                    type: "DELETE",
                    link: "http://localhost:4000/api/users/delete/" + x.UserId
                }
            }
        })
    });
};


exports._showAllCategories = (code, res, msg, response) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response.map(x => {
            return {
                CategoryId: x.CategoryId,
                CategoryName: x.CategoryName,
                ProductCount: x.ProductCount,
                ViewRecord: {
                    type: "GET",
                    link: "http://localhost:4000/api/category/view/" + x.CategoryId,
                },
                ViewProducts: {
                    type: "GET",
                    link: "http://localhost:4000/api/category/products/" + x.CategoryId,
                },
                EditRecord: {
                    type: "PUT",
                    link: "http://localhost:4000/api/category/edit/" + x.CategoryId,
                },
                DeleteRecord: {
                    type: "DELETE",
                    link: "http://localhost:4000/api/category/delete/" + x.CategoryId
                }
            }
        })
    });
};


exports._showSingleCategory = (code, res, msg, response) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response.map(x => {
            return {
                CategoryId: x.CategoryId,
                CategoryName: x.CategoryName,
                CategoryDescription: x.CategoryDescription,
                CreatedAt: x.CreatedAt,
                ProductCount: x.ProductCount,
                ViewProducts: {
                    type: "GET",
                    link: "http://localhost:4000/api/category/products/" + x.CategoryId,
                },
                EditRecord: {
                    type: "PUT",
                    link: "http://localhost:4000/api/category/edit/" + x.CategoryId,
                },
                DeleteRecord: {
                    type: "DELETE",
                    link: "http://localhost:4000/api/category/delete/" + x.CategoryId
                }
            }
        })
    });
};


exports._checkPassword = (password) => {
    return password.length < 8 ? false : true;
};


exports._getCallBack = (callBack, err, result) => {
    if (err) {
        return callBack(err);
    }
    else {
        return callBack(null, result);
    }
}