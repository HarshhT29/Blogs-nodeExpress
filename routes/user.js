const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { userRegistration, userLogin, userLogout } = require("../controllers/userHandlers");

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userProfile = path.join(__dirname, "../public/images/profile-images");
        cb(null, userProfile);
    },
    filename: (req, file, cb) => {
        const fname = `${Date.now()}-${file.originalname}`;
        cb(null, fname);
    }
});
const upload = multer({storage: storage});

router.get("/register", (req, res) => {
    return res.render("register", { title: "Register", error: null });
});
router.get("/login", (req, res) => {
    return res.render("login", { title: "Login", error: null });
});

router.post("/register", upload.single("profileImage"), userRegistration);
router.post("/login", userLogin);
router.get("/logout", userLogout);

module.exports = router;