const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./src/routes/index");
const PurchaseOrder = require("./src/models/purchaseOrder.model");
const PurchaseOrderDetail = require("./src/models/purchaseOrderDetail.model");
require("./src/config/db.config");
const app = express();
dotenv.config();
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", router);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// const {
//     seedGeographicEntities,
// } = require("./src/seeders/geographic_entity/seedGeographicEntities");
// seedGeographicEntities();