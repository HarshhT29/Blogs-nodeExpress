const { Router } = require("express");
const { userRegistration, userLogin, userLogout } = require("../controllers/userHandlers");
const router = Router();

router.get("/register", (req, res) => {
    return res.render("register", { title: "Register", error: null });
});
router.get("/login", (req, res) => {
    return res.render("login", { title: "Login", error: null });
});

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/logout", userLogout);

module.exports = router;