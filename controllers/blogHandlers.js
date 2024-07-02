const BLOG = require("../models/blog");
const COMMENT = require("../models/comment");

const createBlog = async (req, res) => {
    const body = req.body;
    if (!body.title || !body.content)
        return res.status(400).render("addBlogs", { title: "Add Blog", user: req.user, error: "All fields are required" });

    let coverImagePath = null;
    if (req.file)
        coverImagePath = `images/cover-images/uploads/${req.user._id}/${req.file.filename}`;

    try {
        await BLOG.create({
            title: body.title,
            content: body.content,
            createdBy: req.user._id,
            coverImage: coverImagePath
        });
        // console.log(req.body);
        // console.log(req.file);
        return res.redirect("/");
    } catch (err) {
        console.error("error:", err);
        return res.status(500).render("addBlogs", { title: "Add Blog", error: "Server issue Blog creation failed!!" });
    }
}

const getBlogById = async (req, res) => {
    const blog = await BLOG.findById(req.params.id).populate("createdBy");
    if(!blog)
        return res.status(404).render("error", { title: "Error", message: "404: Blog not found" });

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
            createdBy: req.user._id,
        });
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (err) {
        return res.status(500).render("addBlogs", { title: "Add Blog", error: "Server issue Blog creation failed!!" });
    }
};

const deleteBlog = async (req, res) => {
    const blogId = req.params.id;
    try {
        const blog = await BLOG.findById(blogId);

        if(req.user._id.toString() !== blog.createdBy.toString())
            return res.status(403).render("error", { title: "Error", message: "403:You are not authorized to delete this blog" });
        await COMMENT.deleteMany({blogId: blogId});   //blog pe ke saare comments bhi delete hojayenge
        await BLOG.findByIdAndDelete(blogId);
        return res.redirect("/");
    } catch(err) {
        return res.status(500).render("error", { title: "Error", message: "500:Server issue blog deletion failed" });
    }
};

const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await COMMENT.findById(commentId);
        if(req.user._id.toString() !== comment.createdBy.toString())
            return res.status(403).render("error", { title: "Error", message: "403:You are not authorized to delete this comment" });
        await COMMENT.findByIdAndDelete(commentId);
        return res.redirect(`/blog/${comment.blogId}`);
    } catch(err) {
        return res.status(500).render("error", { title: "Error", message: "500:Server issue comment deletion failed" });
    }
};

module.exports = { createBlog, getBlogById, createComment, deleteBlog, deleteComment };