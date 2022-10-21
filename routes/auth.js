const router = require('express').Router();
const {registerAdmin}=require('../controllers/authControllers')


router.get('/',(req,res)=>{
    res.json("Admin Server is Alive");
});

router.post("/register", registerAdmin);
// router.use("/login",require('./login'));





module.exports = router;