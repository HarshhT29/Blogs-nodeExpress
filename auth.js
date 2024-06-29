const JWT = require("jsonwebtoken");

const secret = "$ecret!@#$%*09876";

const createToken = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    return JWT.sign(payload, secret);
}

const validateToken = (token) => {
    return JWT.verify(token, secret);
}

module.exports = { createToken, validateToken };