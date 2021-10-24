const router = require('express').Router();

// router.use("/registeration",require("./registration/registration"));
router.use("/login",require('./login/login'));




module.exports = router;