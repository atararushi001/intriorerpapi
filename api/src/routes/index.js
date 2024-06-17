const router = require("express").Router();

const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");
const geographicEntityRoutes = require("./geographic_entity.routes");
const extraWorkRoutes = require("./exta_work.routes");
const packageRoutes = require("./package.routes");
const designRoutes = require("./design.routes");
const unitRoutes = require("./unit.routes");
const productRoutes = require("./product.routes");

const purchaseOrderRoutes = require("./purchase_order.routes");

// const orderRoutes = require("./order.routes");
const paymentStageRoutes = require("./payment_stage.routes");


router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/geographic-entities", geographicEntityRoutes);
router.use("/extra-works", extraWorkRoutes);
router.use("/packages", packageRoutes);
router.use("/designs", designRoutes);
router.use("/units", unitRoutes);
router.use("/products", productRoutes);

router.use("/purchase-orders", purchaseOrderRoutes);

// router.use("/orders", orderRoutes);
router.use("/payment-stages", paymentStageRoutes);


module.exports = router;
