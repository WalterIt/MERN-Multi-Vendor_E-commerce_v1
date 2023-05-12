const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World from socket Server!!!");
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Define a message object with a seen property
const createMessage = ({ senderId, text, receiverId, images }) => ({
  senderId,
  text,
  receiverId,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  console.log("A user is connected!");

  // Take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Send and Get messages
  const messages = {};
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, text, receiverId, images });

    const user = getUser(receiverId);

    // Store the messages in the messages object
    if (!messages) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId]?.push(message);
    }

    // Send the message to the receiver
    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    // Update the seen flag for the message
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;

        // Send the message to the receiver
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });

  // Update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
    io.emit("getLastMessage", { lastMessage, lastMessagesId });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT || 8000}!`);
});
