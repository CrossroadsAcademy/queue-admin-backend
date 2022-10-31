const db = require('../db/authHelpers');
const { validateRegister, validateLogin, forgotPassword } = require('../validations/authValidators');

module.exports.registerAdmin = function (req, res) {
    try {
        const { error, value } = validateRegister(req.body)
        if (error) {
            return res.json({ status: 422, errors: error.details })
        }
        db.registerAdmin(value).then((response) => {
            res.json({ status: 200, message: "Registration success" });
        }).catch((error) => {
            res.json({ status: 500, message: error.message })
        })
    } catch (error) {
        res.json({ status: 501, message: error.message });
    }
}

module.exports.adminLogin = function (req, res) {
    try {
        const { error, value } = validateLogin(req.body)
        if (error) {
            return res.json({ status: 422, errors: error.details })
        }
        db.Login(value).then((response) => {
            res.json({ status: 200, message: "Login success" });
        }).catch((error) => {
            res.json({ status: 500, message: error.message })
        })
    } catch (error) {
        res.json({ status: 501, message: error.message });
    }
}


module.exports.forgotPassword = function (req, res) {
    try {
        const { error, value } = forgotPassword(req.body)
        if (error) {
            return res.json({ status: 422, errors: error.details })
        }
        db.ForgotPassword(value).then((response) => {
            res.json({ status: 200, message: "mail sended" });
        }).catch((error) => {
            res.json({ status: 500, message: error.message })
        })

    } catch (error) {
        res.json({ status: 501, message: error.message });
    }
}