const router = require("express").Router();

const projectController = require("../controllers/project.controller");

router.post("/", projectController.createProject);
router.put("/:id", projectController.updateProject);
router.patch("/:id/assign-designer", projectController.assignDesigner);
router.patch("/:id/assign-head-carpenter", projectController.assignHeadCarpenter);
router.delete("/:id", projectController.deleteProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);

module.exports = router;
