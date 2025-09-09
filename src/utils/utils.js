
const validator = require('validator');
const validationData = (req) => {
    const { name, email, password } = req.body;

    if (!name ){
        throw new Error("Name is required");
    } else if (!validator.isEmail(email)) {
        throw new Error("Email is required");
    } else if (!password) {
        throw new Error("Password is required");
    }
}

module.exports = { validationData };