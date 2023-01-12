const express = require("express");
const next = require("next");
const mongoose = require("mongoose");

//Router files imports
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auths");

//Part of server connection
const PORT = 3000; //process.env.PORT || 3000
const dev = process.env.NODE_DEV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config

mongoose.connect("mongodb://localhost:27017/social-app");

nextApp.prepare().then(() => {
  // express code here
  const app = express();
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

  app.get("*", (req, res) => {
    return handle(req, res); // for all the react stuff
  });

  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });
});
