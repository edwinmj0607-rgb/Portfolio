const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/portfolio");

const DataSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Data = mongoose.model("Data", DataSchema);

app.post("/save", async (req, res) => {
    const newData = new Data(req.body);
    await newData.save();
    res.send("Saved");
});

app.listen(5000, () => console.log("Server running"));