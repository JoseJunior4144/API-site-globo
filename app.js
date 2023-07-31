const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const JWTSecret = "dwfiodjkcxm,.xlsosmfdsw"

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var DB =  { 
    users: [
        {
            id: 1,
            name: "João Silveira",
            email: "itajr@gmail.com",
            password:"123"
        },
        {
            id: 20,
            name: "Guilherme",
            email: "gui@gmail.com",
            password: "321"
        }
    ]
}

function auth(req, res, next){
    const authToken = req.headers['Authorization']
    if(authToken != undefined) {
        const bearer = authToken.split(' ')
        var token = bearer[1]
        jwt.verify(token, JWTSecret, (err, data) => {
            if(err) {
                res.status(401)
                res.json({err: "Token inválido"})
            } else {
                req.token = token 
                req.loggedUser = {id: data.id, email: data.email}
                next()
            }
        })
    } else {
        res.status(401)
        res.json({err: "Token Inválido!"})
    }
}

app.post("/auth", (req,res) => {
    var {email, password} = req.body

    if(email!=undefined) {
        
        var user = DB.users.find(u => u.email == email)
        if(user != undefined) {
            if(user.password == password) {
                jwt.sign({
                    id: user.id,
                    email: user.email
                }, JWTSecret, {expiresIn:'48h'}, (err, token) => {
                    if(err) {
                        res.status(400)
                        res.json({err: "Ocorreu um erro interno!"})
                    } else {
                        res.status(200)
                        res.json({token: token})
                    }
                })
            } else {
                res.status(401)
                res.json({err: "Senha incorreta!"})
            }
        } else {
            res.status(404)
            res.json({err: "O email enviado não foi encontrado no banco de dados.\nVocê tem um cadastro?"})
        }
    } else {
        res.status(400)
        res.json({err: "O email não existe em nosso banco de dados!\nVocê tem um cadastro?"})
    }
})

app.listen(5000, () => {
    console.log("API RODANDO!")
})