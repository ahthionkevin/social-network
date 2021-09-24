const express = require("express")
const bodyParse = require('body-parser')
require('dotenv').config({path: './config/.env'})
const userRoute = require("./routes/user.routes")
const app = express()

require('./config/db')


app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: true}))
app.use("/api/user",userRoute)

app.listen(process.env.PORT, () =>{
    console.log(`Listening on port ${process.env.PORT}`)
})