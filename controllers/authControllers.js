const db = require('../db/authHelpers');

module.exports.registerAdmin = function (req, res) {
    try {
        const data = req.body
        const { username, password, email, organisation } = data
        if (username && password && email && organisation) {
            db.registerAdmin(data).then((response) => {
                res.json({ status: 200, message: "Registration success" });
            }).catch((error) => {
                res.json({ status: 500, message: error.message })
            })
        }
        else res.json({ status: 500, message: "Insufficient data" })
    } catch (error) {
        res.json({ status: 501, message: error.message });
    }
}

module.exports.adminLogin = function (req, res) {
    try {
        const data = req.body
        const { username, password } = data
        if (username && password) {
            db.Login(data).then((response) => {
                res.json({ status: 200, message: "Login success" });
            }).catch((error) => {
                res.json({ status: 500, message: error.message })
            })
        }
        else res.json({ status: 500, message: "Insufficient data" })
    } catch (error) {
        res.json({ status: 501, message: error.message });
    }
}
