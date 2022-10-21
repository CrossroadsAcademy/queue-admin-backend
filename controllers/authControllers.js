const db =require('../db/authHelpers');

module.exports.registerAdmin = function (req,res){
    try {
        const {username, password}=req.body
        db.registerAdmin(req.body).then((response)=>{
            res.json("success");    
        }).catch((error)=>{
            res.json(error.msg)
        })

    } catch (error) {
        console.log(error);
        res.json({ status: 501, msg: 'Something Went Wrong in registerAdmin Controller'});
    }
}
