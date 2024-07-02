const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createBlog, getBlogById, createComment, deleteBlog, deleteComment } = require("../controllers/blogHandlers");
const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const userFolder = path.join(__dirname, "../public/images/cover-images/uploads", req.user._id.toString());
            fs.mkdirSync(userFolder, { recursive: true });
            cb(null, userFolder);
        } catch (err) {
            cb(err);
        }
    },
    filename: (req, file, cb) => {
        const fname = `${Date.now()}-${file.originalname}`;
        cb(null, fname);
    }
});
const upload = multer({ storage: storage });
router.get("/add-blog", (req, res) => {
    return res.render("addBlogs", { title: "Add Blog", user: req.user });
});

router.post("/add-blog", upload.single("coverImage"), createBlog);
router.get("/:id", getBlogById);
router.post("/comment/:blogId", createComment);
router.delete("/:id", deleteBlog);
router.delete("/comment/:commentId", deleteComment);

module.exports = router;