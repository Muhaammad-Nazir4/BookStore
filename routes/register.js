const express = require("express");
const router = express.Router();
const multer = require("multer");
const { transporter } = require("../nodemailer/nodemailer");
const {connection} =require("../database/sql");


var storage=multer.diskStorage({

destination:function(req,file,cb){
    cb(null,"./public/images/");
},

filename:function(req,file,cb){
    cb(null,Date.now()+file.originalname)
}
    })

    var upload=multer({storage});
    const multipleupload=upload.fields([{name:"file1"},{name:"file2"}]);

router.post('/',multipleupload, (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const file1=req.files.file1[0].filename;
    const file2=req.files.file2[0].filename;
    const mailOption={
         from: `Muhammad Nazir <nazir1081ashraf@gmail.com>`,
         to:email,
         subject:"You have been Registered!",
         html:`<p> Hy Muhammad Nazir, You are regeistered.</p>`
    }
const data={
    myName:name,
    myEmail:email,
    myPassword:password,
    myImage1:file1,
    myImage2:file2
}
connection.query('INSERT into register SET ?', data, (err,response)=>{
    if(err) throw err;
    else{
        console.log("Data saved in database");
        transporter.sendMail(mailOption,(error,info)=>{
            if (error) throw error;
            else {
                console.log("Email Send!");
            }
        })
        res.redirect('http://localhost:3000');
    }
})


    

});

module.exports=router