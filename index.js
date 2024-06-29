const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { cookieAuthentication } = require("./middlewares/authentication");
const BLOG = require("./models/blog");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const app = express();
const PORT = 8080;
const MONGODB_URI = "mongodb://127.0.0.1:27017/Blog";

mongoose.connect(MONGODB_URI).then(() => console.log("MongoDB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieAuthentication("token"));

app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
    const allBlogs = await BLOG.find({}).sort( {createdAt: -1} );
    return res.render("index", {
        title: "Home",
        user: req.user,
        blogs: allBlogs
    });
});
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));