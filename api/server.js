require("dotenv").config({ path: ".env" });

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

require("./config/db.config");

const router = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
	res.status(200);
	res.send("Welcome to root URL of Server");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
