const db = require('../db/authHelpers');
const { validateRegister, validateLogin, validateForgot, validateOtp } = require('../validations/authValidators');

module.exports.registerAdmin = function (req, res) {
    try {
        const { error, value } = validateRegister(req.body)
        if (error) {
            return res.status(422).json({ errors: error.details })
        }
        db.registerAdmin(value).then((response) => {
            res.status(200).json({ message: "Registration success" });
        }).catch((error) => {
            res.status(500).json({ message: error.message })
        })
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
}

module.exports.adminLogin = function (req, res) {
    try {
        const { error, value } = validateLogin(req.body)
        if (error) {
            return res.status(422).json({ errors: error.details })
        }
        db.Login(value).then((response) => {
            res.status(200).json({ message: "Login success" });
        }).catch((error) => {
            res.status(500).json({ message: error.message })
        })
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
}


module.exports.AdminForgot = function (req, res) {
    try {
        const { error, value } = validateForgot(req.body)
        if (error) {
            return res.status(422).json({ errors: error.details })
        }
        db.ForgotPassword(value).then((response) => {
            res.status(200).json({ message: "mail sended" });
        }).catch((error) => {
            res.status(500).json({ message: error.message })
        })

    } catch (error) {
        res.status(501).json({ message: error.message });
    }
}

module.exports.AdminOtp = function (req, res) {
    try {
        const { error, value } = validateOtp(req.body)
        if (error) {
            return res.status(422).json({ errors: error.details })
        }
        db.Otp(value).then((response) => {
            res.status(200).json({ message: "otp verified and password is changed" });
        }).catch((error) => {
            console.log(error.message);
            res.status(500).json({ message: error.message })
        })

    } catch (error) {
        res.status(501).json({ message: error.message });
    }
}