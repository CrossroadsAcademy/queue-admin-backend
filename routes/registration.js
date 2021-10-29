const router = require('express').Router();
const controller = require('../controllers/index');


//Admin Registration 
router.post('/',controller.registerAdmin); 

















module.exports = router;