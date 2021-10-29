const db =require('../db/index');

//  Admin Model
// {
//     Id: “kdsj3453”
//     Username: ”crossroads”,
//     Password:”aksdjksjld”,
//     Institution_name: “ca academy”,
//     Location: “Calicut”,
//     Image: “sakl.jpeg”,
//     Email: “cro*****@gmail.com”,
//     Phone: “876543****”
//     }

module.exports.registerAdmin = function (req,res){
    try {

    db.registerAdmin(req.body);


    res.json("success");
        
    } catch (error) {
        console.log(error);
        res.json({ status: 501, msg: 'Something Went Wrong in registerAdmin Controller'});
    }
}