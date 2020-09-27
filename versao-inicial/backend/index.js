const express = require('express')
const app = express()
const consign = require('consign')

// // gerenciar meu middlewares 
consign()
    //lendo os arquivos
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

    
app.post('/teste', (req, res)=>{
    res.send(req.body)
})

app.listen(3000, ()=>{
    console.log("executando")
})