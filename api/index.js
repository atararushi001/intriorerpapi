const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require('http');
const router = require("./src/routes/index");
const PurchaseOrder = require("./src/models/purchaseOrder.model");
const PurchaseOrderDetail = require("./src/models/purchaseOrderDetail.model");
require("./src/config/db.config");
const app = express();
const { Op } = require('sequelize'); 
var server = http.createServer(app);
var io = require("socket.io")(server);
const Message = require('./src/models/chat.model');
dotenv.config();
app.use(cors("*"));

app.use(express.json());
var clients = {};

io.on("connection", (socket) => {
  console.log("connetetd");
  console.log(socket.id, "has joined");
  socket.on("signin", async (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: id },
          { receiver_id: id }
        ]
      },
      order: [['timestamp', 'ASC']]
    });

    socket.emit("chat history", messages);
  });
  socket.on("message", async (msg) => {
    console.log(msg);
    let targetId = msg.sourceId;
    let senderId = msg.targetId;

    await Message.create({
      sender_id: senderId, // or use msg.senderId if you send it from the client
      receiver_id: targetId,
      content: msg.message
    });


    if (clients[targetId]) clients[targetId].emit("message", msg);
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", router);
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});