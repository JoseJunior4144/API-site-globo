const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const JWTSecret = "dwfiodjkcxm,.xlsosmfdsw"

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const port = process.env.PORT || 3001
console.log("Hello World")
console.log("Hi")