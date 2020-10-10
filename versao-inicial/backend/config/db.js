// configurando o knex

const config = require('../knexfile.js')
const knex = require('knex')(config)

// executa o knex ao executar o app
//knex.migrate.latest([config])

module.exports = knex