const router = require("express").Router();

const projectController = require("../controllers/project.controller");

router.post("/", projectController.createProject);
router.put("/:id", projectController.updateProject);
router.patch("/:id/assign-designer", projectController.assignDesigner);
router.patch("/:id/assign-head-carpenter", projectController.assignHeadCarpenter);
router.patch("/:id/assign-Supervisor", projectController.assignSupervisor);
router.delete("/:id", projectController.deleteProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.get("/designer/:id", projectController.getProjectsByDesignerId);
router.get("/supervisor/:id", projectController.getProjectsBysupervisorId);
router.put('/updatestatus/:id', projectController.updateProjectStatus);
module.exports = router;
