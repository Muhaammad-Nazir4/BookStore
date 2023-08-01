const mysql= require("mysql");

const connection = mysql.createConnection({
    host:'b5dhahfj9ksbgldt18xi-mysql.services.clever-cloud.com',
    user:'u9w5nesbztreie89',
    password:'e49TEDYOs24W1V4CXeEi',
    database:'b5dhahfj9ksbgldt18xi',
    port:'3306',
})

connection.connect((err)=>{
    if(err) throw err;
    else{
        console.log("Database Connected");
    }
})

module.exports={connection};