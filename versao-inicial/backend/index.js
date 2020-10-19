const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./config/db')

app.db = db

// // gerenciar meu middlewares 
consign()
    //lendo os arquivos
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

    
app.post('/teste', (req, res)=>{
    res.send(req.body)
})

app.listen(3000, ()=>{
    console.log("executando")
})