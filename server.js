const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

mongoose.connect("mongodb+srv://edwin:061077@kju.ndce6vu.mongodb.net/portfolio?retryWrites=true&w=majority")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const DataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Data = mongoose.model("Data", DataSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/save", async (req, res) => {
    try {
        const newData = new Data(req.body);
        await newData.save();
        res.json({ message: "Saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving data" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on " + PORT));