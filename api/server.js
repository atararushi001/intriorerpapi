require("dotenv").config({ path: ".env" });
const { seedCountriesStatesCities } = require("./seeders/countryStateCity/seedData");
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
app.use('/uploads', express.static(path.join(__dirname, 'public')));
express.static("public");
app.get("/", (req, res) => {
	res.status(200);
	res.send("Welcome to root URL of Server");
});

// seedCountriesStatesCities();
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
