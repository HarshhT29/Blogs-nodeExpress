const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    return res.render("index");
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));