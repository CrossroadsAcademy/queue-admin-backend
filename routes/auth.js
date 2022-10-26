const router = require('express').Router();
const { registerAdmin, adminLogin } = require('../controllers/authControllers')


router.get('/', (req, res) => {
    res.json("Admin Server is Alive");
});

router.post("/register", registerAdmin);
router.post("/login", adminLogin);





module.exports = router;