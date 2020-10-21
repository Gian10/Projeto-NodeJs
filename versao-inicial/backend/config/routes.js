const admin = require('./admin')

module.exports = app =>{
    // cadastrar usuario sem token
    app.post('/signup', app.api.user.save)
    // logar no sistema
    app.post('/signin', app.api.auth.signin)
    //
    app.post('/validateToken', app.api.auth.validateToken)

    // users
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))
        .delete(admin(app.api.user.remove))
    
    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))

    // categories
    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    app.route('/categories/tree')
        .get(app.api.category.getTree)

  // cuidado com a ordem das rotas. criar as rotas genericas por ultimo
    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    // articles
    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.articles.get))
        .post(admin(app.api.articles.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getById)
        .put(admin(app.api.articles.save))
        .delete(admin(app.api.articles.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getByCategory)
}