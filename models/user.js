const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../auth");

const userSchema = new Schema({
    profileImageURL: {
        type: String,
        default: "/images/userIcon.jpg"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.salt = salt;
        this.password = hash;
        next();
    } catch(err) {
        next(err);
    }
});

userSchema.statics.verifyPassword = async function(email, password) {
    const user = await this.findOne({ email: email });
    if(!user) return false;
    const valid = await bcrypt.compare(password, user.password);
    const token = createToken(user);
    return {valid, token};
};

const User = model("users", userSchema);

module.exports = User;