const router = require('express').Router();


router.get('/',(req,res)=>{
    res.json("Admin Server is Alive");
});
router.use("/register",require("./registration"));
router.use("/login",require('./login'));




module.exports = router;