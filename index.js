// This is the main entry point of the application. It sets up the HTTP server using the built-in 'http' module and the Express application defined in 'express.config.js'. The server listens on a specified host and port, and logs a message when it starts successfully.
const http= require("http");
const app = require("./src/config/express.config") //importing express app from config file

const httpServer =http.createServer(app);   //application handeler function

const HOST="127.0.0.1"; // server Ip
const PORT =9005;

//host and port listening
httpServer.listen(PORT, HOST,(err)=>{
    if(!err){
        console.log("server running in port,"+PORT+",host: ",HOST)
        console.log("press Ctrl + C to disconnet the server")
    }
})