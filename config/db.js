const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://"+process.env.DB_USER_PASSWD+"@cluster0.8tqdo.mongodb.net/mern-project",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
)
.then(() => console.log("connected to Mongoose"))
.catch((err) => console.log("failed to Connect to Mongodb",err))