const { verify } = require("jsonwebtoken");

exports._validateToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        token = token.slice(7);
        verify(token, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    messgae: "Invalid token"
                });
            }
            else {
                next();
            }
        });
    }
    else {
        return res.status(403).json({
            success: false,
            messgae: "Access denied! Unauthorized user"
        });
    }
};