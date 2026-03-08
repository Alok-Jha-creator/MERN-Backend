const http= require("http");
const app = require("./src/config/express.config") //importing express app from config file

const httpServer =http.createServer(app);   //application handeler function

const HOST="127.0.0.1"; // server Ip
const PORT =9005;

httpServer.listen(PORT,HOST,(err)=>{
    if(!err){
        console.log("server running in port,"+PORT+",host: ",HOST)
        console.log("press Ctrl + C to disconnet the server")
    }
})