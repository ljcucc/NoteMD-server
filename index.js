import express, { json } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
// import * as Redis from "ioredis";
import cros from "cors";
import { FSDatabase, RamDatabase } from "./data/Database.js";

dotenv.config();

const { 
  AUTH_USERNAME,
  AUTH_KEY,
  PORT,
  CROS_WHITELIST
} = process.env;

const app = express();
app.use(express.json());
applyCORS();
app.use((req, res, next)=>{
  const token = req.body?.jwt || "";
  jwt.verify(token, AUTH_KEY, (err ,decoded)=>{
    if(err){
      res.json({result: false});
      return;
    }
    next();
  });
});


function generateJWT(){
  return jwt.sign({
    data: "success"
  }, AUTH_KEY, {expiresIn: (60 * 60 * 24 * 7)});
}

function applyCORS() {
  // apply cros
  var corsOptionsDelegate = function (req, callback) {
    const allowlist = ['https://notes.ljcu.cc', ...(CROS_WHITELIST || "http://localhost:8080").split(",").map(e => e.trim())]

    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    corsOptions["method"] = ["POST"]
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
  app.use(cros(corsOptionsDelegate));
}

const AUTH_JWT_KEY = generateJWT();
// const db = new RamDatabase();
const db = new FSDatabase();

app.post("/api/get", async (req, res) => {
  const { key } = req.body;
  const value = await db.getItem(key);
  // console.log("/api/get", key, value);
  res.json({
    type: "get",
    result: true,
    value 
  });
});

app.post("/api/set", async (req, res)=>{
  const { key, value } = req.body;
  // console.log("/api/set", key, value)
  await db.setItem(key, value);
  res.json({
    type: "set",
    result: true
  });
});

app.post("/api/remove", async (req, res)=>{
  const { key } = req.body;
  // console.log("/api/remove", key)
  await db.removeItem(key);
  res.json({
    type: "remove",
    result: true
  });
});

app.post("/api/is_exists", async (req, res)=>{
  const { key } = req.body;
  // console.log(req.body);
  // console.log("/api/is_exists", key, db.isExists(key))
  res.json({
    type: "check",
    result: db.isExists(key)
  });
});

app.post("/api/test", (req, res)=>{
  // console.log("/api/test");
  res.json({
    result: true
  });
});

app.listen(PORT || 8081, ()=>{
  console.log("app is running...");
  console.log(`your login key (JWT) is ${AUTH_JWT_KEY}`)
});