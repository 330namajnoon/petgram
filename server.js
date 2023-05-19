const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 4000;
const pdp = path.join(__dirname, "./client");
const app = express();
const fs = require("fs");
app.use(express.static(pdp));
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
server.listen(port, () => {
  console.log(`server is up on port ${port}!`);
});

io.on("connect", (client) => {
  console.log("new connect");

  client.on("msg", (msg) => {
    io.emit("msg", msg);
  });

  client.on("disconnect", () => {
    console.log("new disconnect");
  });
});

app.post("/downloadStorys",multer().none(),(req,res)=> {
  console.log("hola")
  try {
    fs.readFile("./database/usersData.json",(err,data)=> {
      if(err) throw err;
      const usersData = JSON.parse(data.toString());
      res.send(JSON.stringify(usersData.storys));
    })
  } catch (error) {
    res.send(error);
  }

})
