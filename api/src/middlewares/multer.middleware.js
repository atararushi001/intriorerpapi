const multer = require("multer");

const mimeTypes = ["image/jpeg", "image/png", "image/jpg"];

const { v4: uuidv4 } = require("uuid");

const generateFileName = (prefix) => {
    return (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const fileName = `${prefix}-${uniqueSuffix}-${file.originalname}`;
        cb(null, fileName);
    };
};

const fileFilter = (req, file, cb) => {
    if (mimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG and PNG are allowed"));
    }
};

const profilePictureStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/user");
    },
    filename: generateFileName("profilePicture"),
});
const TaskStrorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/Task");
    },
    filename: generateFileName("TaskStimages"),
});
const designStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/designs");
    },
    filename: generateFileName("design"),
});

const extraWorkStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/extraWorks");
    },
    filename: generateFileName("extraWork"),
});

const Punch_in_Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/punch_in");
    },
    filename: generateFileName("extraWork"),
});
const profilePictureUpload = multer({
    storage: profilePictureStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2MB
    },
});
const taskimagesupload = multer({
    storage: TaskStrorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2MB
    },
});

const designUpload = multer({
    storage: designStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10, // 5MB
    },
});

const extraWorkUpload = multer({
    storage: extraWorkStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10, // 5MB
    },
});

const punch_in_image = multer({
    storage: Punch_in_Storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10, // 5MB
    },
});
module.exports = {
    profilePictureUpload,
    designUpload,
    extraWorkUpload,
    punch_in_image,
    taskimagesupload,
};
