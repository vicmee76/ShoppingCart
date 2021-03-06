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



// customized function object to show  products from database
exports._showProducts = (code, res, msg, response, expiry = null) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response.map(x => {
            let url = "http://localhost:4000/api/cart/" + x.ProductId;
            if (expiry === "expired") {
                url = "";
            }
            return {
                ProductId: x.ProductId,
                CategoryId: x.CategoryId,
                CategoryName: x.CategoryName,
                ProductName: x.ProductName,
                Price: getPrice(x.SellingPrice, x.Discount),
                Discount: x.Discount <= 0 ? "" : x.Discount + "% Off",
                OldPrice: x.Discount <= 0 ? "" : parseFloat(x.SellingPrice),
                ProductImage: x.ProductImages.split(",")[0],
                Expiry: getProductExpiry(x.ExpiredAt),
                AddToCart: {
                    type: "POST",
                    link: url,
                },
                ViewProducts: {
                    type: "GET",
                    link: "http://localhost:4000/api/products/product-details/" + x.ProductId,
                },
                ViewCategory: {
                    type: "GET",
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
exports._showSingleProducts = (code, res, msg, response, expiry = null) => {
    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response.map(x => {
            let url = "http://localhost:4000/api/cart/" + x.ProductId;
            if (expiry === "expired") {
                url = "";
            }
            return {
                ProductId: x.ProductId,
                CategoryId: x.CategoryId,
                CategoryName: x.CategoryName,
                ProductName: x.ProductName,
                ProductDescription: x.ProductDescription,
                Sku: x.Sku,
                Price: getPrice(x.SellingPrice, x.Discount),
                Discount: x.Discount <= 0 ? "" : x.Discount + "% Off",
                OldPrice: x.Discount <= 0 ? "" :  parseFloat(x.SellingPrice),
                ShippingFee: getShippingFee(x.ShippingPercentage, x.SellingPrice),
                StockLevel: x.StockLevel,
                ProductImages: generateArr(x.ProductImages),
                Colors: generateArr(x.Colors),
                PaymentType: generateArr(x.PaymentType),
                Expiry: getProductExpiry(x.ExpiredAt),
                CreatedAt: dateShortcode.parse('{YYYY-MM-DD}', x.CreatedAt),
                AddToCart: {
                    type: "POST",
                    link: url,
                },
                ViewCategory: {
                    type: "GET",
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




// customized function object to show cart items 
exports._showCart = (code, res, msg, response) => {

    let subTotal = 0;
    let totalShipping = 0;
    let totalIteams = 0;

    return res.status(code).json({
        success: true,
        messgae: "Success : " + msg,
        results: response.map(x => {

            subTotal += getPrice(x.SellingPrice, x.Discount);
            totalShipping += getShippingFee(x.ShippingPercentage, x.SellingPrice);
            totalIteams += x.Qty;

            return {
                CartId: x.CartId,
                UserId: x.UserId,
                ProductId: x.ProductId,
                ProductName: x.ProductName,
                Price: parseFloat(getPrice(x.SellingPrice, x.Discount)),
                Discount: x.Discount <= 0 ? "" : x.Discount + "% Off",
                OldPrice: x.Discount <= 0 ? "" : parseFloat(x.SellingPrice),
                ProductImage: x.ProductImages.split(",")[0],
                ShippingFee: parseFloat(getShippingFee(x.ShippingPercentage, x.SellingPrice)),
                Qty : x.Qty,
                ViewProducts: {
                    type: "GET",
                    link: "http://localhost:4000/api/products/product-details/" + x.ProductId,
                },
                EditCart: {
                    type: "PUT",
                    link: "http://localhost:4000/api/cart/edit/" + x.CartId,
                },
                DeleteCart: {
                    type: "DELETE",
                    link: "http://localhost:4000/api/cart/delete/" + x.CartId
                }
            }
        }),
        totalItems: totalIteams,
        subTotal: subTotal,
        totalShipping: parseFloat(totalShipping.toFixed(2)),
        totalAmount: parseFloat(parseFloat(subTotal + totalShipping).toFixed(2))
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


// call back function for error or results gotten database
exports._getResponse = (error, result, resolve, reject ) => {
    if (error) {
        return reject(error);
    }
    else {
        return resolve(result);
    }
}



// get the price of a product after discount
function getPrice(sellingpriec, discount) {
    let price = 0;
    if (discount <= 0) {
        price = sellingpriec;
    }
    else {
        price = (sellingpriec - ((discount / 100) * sellingpriec));
    }
    return parseFloat(parseFloat(price).toFixed(2));
}



// get the shipping fee of a product after discount on shipping fee
function getShippingFee(shipping, sellingprice) {
    let fee = 0;
    if (shipping <= 0 || shipping === "") {
        fee = 0;
    }
    else {
        fee = (sellingprice - (shipping / 100) * sellingprice);
    }
    return parseFloat(parseFloat(fee).toFixed(2));
}



// get the expiry day of each products
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



// Genereate array list for splited product properties such as Color, payment type, images url
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



