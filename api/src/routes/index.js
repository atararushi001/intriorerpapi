const router = require("express").Router();

const userRoutes = require("./user.routes");
const punchinRoutes = require("./punch_in_user.routes");

const projectRoutes = require("./project.routes");
const geographicEntityRoutes = require("./geographic_entity.routes");
const extraWorkRoutes = require("./exta_work.routes");
const packageRoutes = require("./package.routes");
const designRoutes = require("./design.routes");
const unitRoutes = require("./unit.routes");
const productRoutes = require("./product.routes");

const purchaseOrderRoutes = require("./purchase_order.routes");


const paymentStageRoutes = require("./payment_stage.routes");



const TaskRoutes = require("./task.routes");

const reportingRoutes = require("./reporting.routes");

const extraMaterialRoutes = require("./extraMaterial.routes");

const ExpenseRoutes = require("./Expense.routes");

const referenceDesign = require("./referenceDesign.routes");

router.use("/users", userRoutes);
router.use("/punch-in", punchinRoutes);

router.use("/projects", projectRoutes);
router.use("/geographic-entities", geographicEntityRoutes);
router.use("/extra-works", extraWorkRoutes);
router.use("/packages", packageRoutes);
router.use("/Task", TaskRoutes);
router.use("/designs", designRoutes);
// router.use("/designs", designRoutes);
router.use("/units", unitRoutes);
router.use("/products", productRoutes);

router.use("/purchase-orders", purchaseOrderRoutes);

const orderRoutes = require("./order.routes");
const Task = require("../models/task.model");
router.use("/orders", orderRoutes);

router.use("/payment-stages", paymentStageRoutes);
router.use("/reporting", reportingRoutes);

router.use("/extra-materials", extraMaterialRoutes);
router.use("/expenses", ExpenseRoutes);
router.use("/reference-designs", referenceDesign);
module.exports = router;
