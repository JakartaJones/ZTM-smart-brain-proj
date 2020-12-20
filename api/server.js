import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import knex from "knex";
import pkg from "nodemon";

import handleRegister from "./controllers/register.mjs";
import handleSignIn from "./controllers/signin.mjs";
import handleProfile from "./controllers/profile.mjs";
import { handleImage, handleAPICall } from "./controllers/image.mjs";

const { reset } = pkg;

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "matthewjones",
    password: "",
    database: "smart-brain",
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Success");
});

app.post("/signin", (req, res) => {
  handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  handleImage(req, res, db);
});

app.post("/imageURL", (req, res) => {
  handleAPICall(req, res);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

/*
API ROUTE PLAN:
  / --> res = this is working
  /signin --> POST = success/fail
  /register --> POST = user
  /profile/:userID --> GET = user
  /image --> PUT = user 

*/

//FROM BCRYPT DOCS:
// // Load hash from your password DB.
// bcrypt.compare("B4c0//", hash, function (err, res) {
//   // res === true
// });
// bcrypt.compare("not_bacon", hash, function (err, res) {
//   // res === false
// });

// // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
// bcrypt.compare("B4c0//", hash).then((res) => {
//   // res === true
// });
