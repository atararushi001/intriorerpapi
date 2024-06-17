const router = require("express").Router();
const { profilePictureUpload } = require("../middlewares/multer.middleware");
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");

router.post("/", profilePictureUpload.single("profilePicture"), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", profilePictureUpload.single("profilePicture"),  updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
