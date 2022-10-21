const db = require('../db/authHelpers');

module.exports.registerAdmin = function (req, res) {
    try {
        db.registerAdmin(req.body).then((response) => {
            res.json({ status: 200, msg: "Registration success" });
        }).catch((error) => {
            res.json({ status: 500, msg: error.msg })
        })

    } catch (error) {
        console.log(error);
        res.json({ status: 501, msg: 'Something Went Wrong in registerAdmin Controller' });
    }
}
