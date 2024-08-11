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
router.get("/client/:id", projectController.getProjectsByClientId);
router.get("/designer/:id", projectController.getProjectsByDesignerId);
router.get("/supervisor/:id", projectController.getProjectsBysupervisorId);
router.get("/head-carpenter/:id", projectController.getProjectsByhead_carpenter_id);
router.put('/updatestatus/:id', projectController.updateProjectStatus);
module.exports = router;
