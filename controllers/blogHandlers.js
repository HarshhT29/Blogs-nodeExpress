const BLOG = require("../models/blog");

const createBlog = async (req, res) => {
    const body = req.body;
    if(!body.title || !body.content) 
        return res.status(400).render("addBlogs", { title: "Add Blog", user: req.user , error: "All fields are required" });

    try {
        await BLOG.create({
            title: body.title,
            content: body.content,
            createdBy: req.user._id
        });
        return res.redirect("/");
    } catch(err) {
        console.error("error:", err);
        return res.status(500).render("addBlogs", { title: "Add Blog", error: "Server issue Blog creation failed!!" });
    }
}

module.exports = { createBlog };