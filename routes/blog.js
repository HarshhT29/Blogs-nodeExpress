const { Router } = require("express");
const { createBlog } = require("../controllers/blogHandlers");
const router = Router();

router.get("/add-blog", (req, res) => {
    return res.render("addBlogs", {title: "Add Blog", user: req.user});
});

router.post("/add-blog", createBlog);

module.exports = router;