const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();

MongoClient.connect(
  "mongodb+srv://elitracy:Left0518@users.ep1dg.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);

    console.log("Connected to MongoDB Server");

    const db = client.db("Spade");
    const userCollection = db.collection("users");

    app.use(express.static("views"));
    app.use("/Images", express.static("./Images"));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.post("/signup", (req, res) => {
      userCollection.insertOne(req.body);
      // res.redirect("/");
    });

    app.get("/login", (req, res) => {
      const login = req.query;
      let userDetails = {};

      userCollection
        .find({ email: login.email, password: login.password })
        .forEach((doc, err) => {
          userDetails = doc;

          if (userDetails === {}) return console.log("no user");
          console.log(doc);
        });
      res.redirect("/");
    });

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  }
);
