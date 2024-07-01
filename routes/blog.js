const { Router } = require("express");
const { createBlog, getBlogById, createComment } = require("../controllers/blogHandlers");
const router = Router();

router.get("/add-blog", (req, res) => {
    return res.render("addBlogs", {title: "Add Blog", user: req.user});
});

router.post("/add-blog", createBlog);
router.get("/:id", getBlogById);
router.post("/comment/:blogId", createComment);

module.exports = router;