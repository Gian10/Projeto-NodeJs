// criando os middlewares

const bodyParser = require('body-parser')
const cors = require('cors')
// usando consigne para exportar tudo dentro de app, app é a instacancia do express
module.exports = app =>{
    app.use(bodyParser.json())
    app.use(cors())
}


