const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("node:dns"); 
const  cors = require("cors");
const logger = require("morgan");


dns.setDefaultResultOrder("ipv4first");

const app = express();
const mainRoute = require("./routes/index.js");
const port = 5000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4 // 3. Mongoose'a da sadece IPv4 ile bağlanmasını söylüyoruz
    });
    console.log("Connected to mongoDb");
  } catch (error) {
    console.log("Veritabanı Hata Detayı:", error); 
  }
};

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", mainRoute);

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});