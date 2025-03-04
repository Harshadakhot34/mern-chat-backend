// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import cors from "cors"

dotenv.config();
const app = express();
const PORT = 5000;
const MONOGOSE = process.env.mongoDB_url;


// middlewarte
app.use(express.json())
app.use(express.json());

app.use(cors());
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
