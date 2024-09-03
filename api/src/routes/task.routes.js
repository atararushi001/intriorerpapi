const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { taskimagesupload } = require("../middlewares/multer.middleware");

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/project/:projectId', taskController.getTasksByProjectId);
router.get('/:id', taskController.getTaskById);

router.put('/:id', taskimagesupload.single("TaskStimages"), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;