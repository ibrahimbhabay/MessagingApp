let express = require('express');
let socket = require("socket.io")
let path = require('path')

//app setup
let app = express();
let server = require('http').Server(app)


//socket setup
let io = socket(server)

let port = 6600;

app.use("/", express.static(path.join(__dirname, "/dist/chatApp")));

io.on("connection", socket => {
    //new connection from client with ID {socket.id}
    console.log("new connection from client with ID: " + socket.id );

    socket.on("newMsg", data => {
        io.sockets.emit("msg", {msg : data, timeStamp: getCurrentDate() });
    } );

    socket.on("newFeedback", data => {
        io.sockets.emit("feedback", data )
    })
});

server.listen(port, () => {
    console.log("Server listening on port: " + port)
})


function getCurrentDate(){

    let d = new Date();
    return d.toLocaleString();
}



