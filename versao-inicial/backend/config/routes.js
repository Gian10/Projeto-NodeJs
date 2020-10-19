
module.exports = app =>{
    //validation de token
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    // users
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)

    // categories
    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.category.get)
        .post(app.api.category.save)
    app.route('/categories/tree')
        .get(app.api.category.getTree)
  // cuidado com a ordem das rotas. criar as rotas genericas por ultimo
    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    // articles
    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.get)
        .post(app.api.articles.save)
    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getById)
        .put(app.api.articles.save)
        .delete(app.api.articles.remove)

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getByCategory)
}