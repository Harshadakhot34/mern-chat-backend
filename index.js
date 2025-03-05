// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import cors from "cors"
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = 5000;
const MONOGOSE = process.env.mongoDB_url;


// middlewarte
app.use(express.json())
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3001", // your frontend's origin
    credentials: true, // allows cookies, authorization headers, etc.
  })
);
try {
  mongoose.connect(MONOGOSE);
  console.log("connected to mongoDB");
} catch (error) {
  console.log(error);
}
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user" , userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
