const USER = require("../models/user");

const getRandomColor = () => {
    const string = "6789ABCD";
    let color = '#';
    for(let i=0;i<6;i++) {
        let index = Math.floor(Math.random()*string.length);
        color+= string[index];
    }
    return color;
};

const userRegistration = async (req, res) => {
    const body = req.body;
    if(!body.name || !body.email || !body.password) {
        return res.status(400).render("register", { title: "Register", error: "All fields are required" });
    }
    try {
        const existingUser = await USER.findOne({ email: body.email });
        if(existingUser) {
            return res.status(400).render("register", { title: "Register", error: "Email already exists" });
        }
        let userColor = getRandomColor();
        await USER.create({
            name: body.name,
            email: body.email,
            password: body.password,
            color: userColor
        });
        return res.redirect("/user/login");
    } catch (err) {
        console.log(err);
        return res.status(500).render("register", { title: "Register", error: "Registration failed" });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { valid, token } = await USER.verifyPassword(email, password);
        if(!valid) return res.render("login", { title: "Login", error: "Invalid Email or Password" });
        return res.cookie("token", token).redirect("/");
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).render("login", { title: "Login", error: "Login failed" });
    }
};

const userLogout = (req, res) => {
    return res.clearCookie("token").redirect("/");
}

module.exports = { userRegistration, userLogin, userLogout };