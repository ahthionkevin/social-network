const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
    {
        pseudo:{
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true
        },
        password:{
            type: String,
            required: true,
            minLength: 6,
            max: 1024,
            trim: true
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png"
        },
        bio :{
            type: String,
            max: 1024,
        },
        followers: {
            type: [String]
        },
        following: {
            type: [String]
        },
        likes: {
            type: [String]
        }
    },
    {
        timestamps: true,
    }
)


UserSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;