const cors = require("cors");
const { Server } = require("socket.io");

export default  function ExpressServer(port = 4000,pdp = "../DCIM") {
    this.express = require("express");
    this.multer = require("multer");
    this.app = this.express();
    this.fs = require("fs");
    this.app.use(express.static(require("path").join(__dirname, pdp)));
    this.app.use(cors());
    this.server = require("http").createServer(app);
    this.io = new Server(this.server, { cors: { origin: "*" } });
    this.server.listen(process.env.PORT || port, () => {
        console.log(`server is up on port ${port}!`);
    });

}