var crypto = require("crypto");
const dateShortcode = require('date-shortcode');

exports._generateHash = () => {
    return crypto.randomBytes(5).toString('hex');
};

// function to show error messages
exports._showError = (code, res, err) => {
    return res.status(code).json({
        success: false,
        messgae: "Error : " + err
    });
};


// function to show success message
exports._showSuccess = (code, res, msg, response = null, token = null) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response,
        token: token
    });
};


// customized function object to show all users from database
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



// customized function object to show a single users from database
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



// customized function object to show all categories from database
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
                CreateProduct: {
                    type: "POST",
                    link: "http://localhost:4000/api/product/save-product-from-category/" + x.CategoryId,
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



// customized function object to show single category from database
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
                CreateProduct: {
                    type: "POST",
                    link: "http://localhost:4000/api/product/save-product-from-category/" + x.CategoryId,
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


// customized function object to show products from database
exports._showProducts = (code, res, msg, response) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response.map(x => {
            return {
                ProductId: x.ProductId,
                CategoryId: x.CategoryId,
                CategoryName: x.CategoryName,
                ProductName: x.ProductName,
                Price: "$" + getPrice(x.SellingPrice, x.Discount),
                Discount: x.Discount <= 0 ? "" : x.Discount + "% Off",
                ProductImage: x.ProductImages.split(",")[0],
                Expiry: getProductExpiry(x.ExpiredAt),
                ViewProducts: {
                    type: "GET",
                    link: "http://localhost:4000/api/products/product-details/" + x.ProductId,
                },
                ViewCategory: {
                    type: "POST",
                    link: "http://localhost:4000/api/category/view/" + x.CategoryId,
                },
                EditProduct: {
                    type: "PUT",
                    link: "http://localhost:4000/api/products/edit/" + x.ProductId,
                },
                DeleteProduct: {
                    type: "DELETE",
                    link: "http://localhost:4000/api/products/delete/" + x.ProductId
                }
            }
        })
    });
};



// customized function object to show  a particular products from database
exports._showSingleProducts = (code, res, msg, response) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response.map(x => {
            return {
                ProductId: x.ProductId,
                CategoryId: x.CategoryId,
                CategoryName: x.CategoryName,
                ProductName: x.ProductName,
                ProductDescription: x.ProductDescription,
                Sku: x.Sku,
                Price: "$" + getPrice(x.SellingPrice, x.Discount),
                Discount: x.Discount <= 0 ? "" : x.Discount + "% Off",
                OldPrice: x.Discount <= 0 ? "" : parseFloat(x.SellingPrice),
                StockLevel: x.StockLevel,
                ProductImages: generateArr(x.ProductImages),
                Colors: generateArr(x.Colors),
                PaymentType: generateArr(x.PaymentType),
                Expiry: getProductExpiry(x.ExpiredAt),
                CreatedAt: dateShortcode.parse('{YYYY-MM-DD}', x.CreatedAt),
                ViewCategory: {
                    type: "POST",
                    link: "http://localhost:4000/api/category/view/" + x.CategoryId,
                },
                EditProduct: {
                    type: "PUT",
                    link: "http://localhost:4000/api/products/edit/" + x.ProductId,
                },
                DeleteProduct: {
                    type: "DELETE",
                    link: "http://localhost:4000/api/products/delete/" + x.ProductId
                }
            }
        })
    });
};



// function to check password length
exports._checkPassword = (password) => {
    return password.length < 8 ? false : true;
};



// call back function for error or results gotten database
exports._getCallBack = (callBack, err, result) => {
    if (err) {
        return callBack(err);
    }
    else {
        return callBack(null, result);
    }
}




function getPrice(sellingpriec, discount) {
    let price = 0;
    if (discount <= 0) {
        price = sellingpriec;
    }
    else {
        price = (sellingpriec - ((discount / 100) * sellingpriec));
    }
    return parseFloat(price).toFixed(2);
}




function getProductExpiry(expirydate) {

    let result = "";

    const date = dateShortcode.parse('{YYYY-MM-DD}', new Date());
    let produtExpiry = dateShortcode.parse('{YYYY-MM-DD}', expirydate);

    if (date > produtExpiry) {
        result = "Expired Product (" + produtExpiry + ")";
    }
    else {
        result = "Not Expired (" + produtExpiry + ")";
    }

    return result;
}


function generateArr(list) {

    let arr = [];

    if (list !== null) {
        var m = list.split(",");
        if (m.length <= 0) {
            arr.push({ "Item ": list });
        }
        else {
            
            for (let i = 0; i < m.length; i++) {
                arr.push({
                    item : m[i]
                });
            }
        }
    }
    return arr;
}



