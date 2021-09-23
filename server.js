const express = require("express")
require('dotenv').config({path: './config/.env'})
const app = express()

require('./config/db')

app.listen(process.env.PORT, () =>{
    console.log(`Listening on port ${process.env.PORT}`)
})