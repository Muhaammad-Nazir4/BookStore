const nodemailer=require("nodemailer");

let transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"nazir1081ashraf@gmail.com",
        pass:"kxujbsxmjjvuifol",
    }

})
module.exports={transporter};