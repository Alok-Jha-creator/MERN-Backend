// This is the main entry point of the application. It sets up the HTTP server using the built-in 'http' module and the Express application defined in 'express.config.js'. The server listens on a specified host and port, and logs a message when it starts successfully.
const http= require("http");
const app = require('./src/config/express.config'); //importing express app from config file
const { mongodbInit } = require("./src/config/mongodb.config"); //importing mongodb connection function    

const httpServer =http.createServer(app);   //application handeler function

const HOST="127.0.0.1"; // server Ip
const PORT =9005;


/*
//euta tarika yo then catch use garera 
mongodbInit() // mongodbInit asychronous function, so we use then and catch to handle the promise
    .then(()=>{
        httpServer.listen(PORT, HOST,(err)=>{
            if(!err){
                console.log("server running in port,"+PORT+",host: ",HOST)
                console.log("press Ctrl + C to disconnet the server")
            }
        });
    })
    .catch((err)=>{
        process.exit(1);
    })
*/

//aruko tarika try catch use garera inmidiately invoked function expression (IIFE) use garera
(async () => {
    try {
        await mongodbInit(); // wait for the mongodb connection to be established before starting the server
        httpServer.listen(PORT, HOST, (err) => {
            if (!err) {
                console.log("server running on port " + PORT + ", host: " + HOST);
                console.log("press Ctrl + C to disconnect the server");
            }
        });
    } catch (exception) { // Fix: Add 'err' parameter to catch block
        console.log("Errr in server access...",exception);
        process.exit(1); // Exit the process with a failure code
    }
})(); 