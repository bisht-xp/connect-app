const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// passport Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//dotenv
require("dotenv").config({ path: __dirname + "/../.env" });
// const dotenv = require("dotenv");
// dotenv.config();

//Router files imports
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auths");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

//Part of server connection
const dev = process.env.NODE_DEV !== "production";
const PORT = 3000; //process.env.PORT || 3000
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config

// mongoose connections  configration
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/social-app", (err) => {
  if (err) console.log(err);
  else console.log("mongdb is connected");
});

nextApp.prepare().then(() => {
  // express code here

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //session config
  const sessionConfig = {
    secret: "thisshouldbeabettersecret#!",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  };
  app.use(session(sessionConfig));

  //passport configration
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      User.authenticate()
    )
  );

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.get("/api/hello", (req, res) => {
    res.send("hello world");
  });

  app.use("/api/auth", authRouter);
  app.use("/api/post", postsRouter);
  app.use("/api/user", usersRouter);
  app.use("/api/conversations", conversationRoute);
  app.use("/api/messages", messageRoute);

  app.get("*", (req, res) => {
    return handle(req, res); // for all the react stuff
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    // console.log("a user connected");
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    //when disconnect
    socket.on("disconnect", () => {
      // console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
});
