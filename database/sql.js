const mysql= require("mysql");

const connection = mysql.createConnection({
    host:'bioaymgoe85h2wk9so8a-mysql.services.clever-cloud.com',
    user:'uugcwwmcnzhhhxob',
    password:'VrvknxlcLTkSqavUQ0DV',
    database:'bioaymgoe85h2wk9so8a',
    port:'3306',
})

connection.connect((err)=>{
    if(err) throw err;
    else{
        console.log("Database Connected");
    }
})

module.exports={connection};