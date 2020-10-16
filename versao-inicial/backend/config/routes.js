
module.exports = app =>{
    //validation de token
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    // users
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
        console.log("routes")
    
    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)

    // categories
    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save)
    app.route('/categories/tree')
        .get(app.api.category.getTree)
  // cuidado com a ordem das rotas. criar as rotas genericas por ultimo
    app.route('/categories/:id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    // articles
    app.route('/articles')
        .get(app.api.articles.get)
        .post(app.api.articles.save)
    app.route('/articles/:id')
        .get(app.api.articles.getById)
        .put(app.api.articles.save)
        .delete(app.api.articles.remove)

    app.route('/categories/:id/articles')
        .get(app.api.articles.getByCategory)
}