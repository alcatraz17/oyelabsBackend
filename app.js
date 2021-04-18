// Importing necessary packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const apiRoutes = require("./src/routes");

//Middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", apiRoutes);

// Connecting to the database using mongoose
try {
    mongoose.connect(process.env.MY_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Successfully connected to database");
    });
} catch (err) {
    console.error(err);
}

// Health check to check whether the server is running or not.
app.get("/healthcheck", (req, res) => {
    res.status(200).send("Server up and running!");
});

app.listen(process.env.PORT, () => console.log("Server started on port 8000"));
