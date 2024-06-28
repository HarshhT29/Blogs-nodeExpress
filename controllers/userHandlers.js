const USER = require("../models/user");

const userRegistration = async (req, res) => {
    const body = req.body;
    if (!body.name || !body.email || !body.password) {
        return res.status(400).render("register", { error: "All fields are required" });
    }
    try {
        const existingUser = await USER.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).render("register", { error: "Email already exists" });
        }
        await USER.create({
            name: body.name,
            email: body.email,
            password: body.password,
        });
        return res.redirect("/user/login");
    } catch(err) {
        console.log(err);
        return res.status(500).render("register", { error: "Registration failed" });
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isValidUser = await USER.verifyPassword(email, password);
        if(!isValidUser) return res.render("login", { error: "Invalid Email or Password" });
        return res.redirect("/");
    } catch(err) {
        console.error("Login error:", err);
        return res.status(500).render("login", { error: "Login failed" });
    }
};
module.exports = { userRegistration, userLogin };