const mongoose=require('mongoose')

require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);

const connectionString=process.env.connectionString
mongoose.connect(connectionString).then(res=>{
    console.log("Database connection Successfull");
}).catch(err=>{
    console.log("Database Connection Failed");
})