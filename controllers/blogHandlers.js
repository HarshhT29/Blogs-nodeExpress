const BLOG = require("../models/blog");
const COMMENT = require("../models/comment");

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

const getBlogById = async (req, res) => {
    const blog = await BLOG.findById(req.params.id).populate("createdBy");
    const comments = await COMMENT.find({ blogId: req.params.id }).populate("createdBy");
    return res.render("blog", {
        title: blog.title,
        blog: blog,
        user: req.user,
        comments: comments,  
    });
}

const createComment = async (req, res) => {
    try {
        await COMMENT.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id
        });
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch(err) {
        return res.status(500).render("addBlogs", { title: "Add Blog", error: "Server issue Blog creation failed!!" });
    }
};

module.exports = { createBlog, getBlogById, createComment };