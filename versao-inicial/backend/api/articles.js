const query = require('./querys')

module.exports = app =>{
    // Destructuring 
    const{ existsOrError} = app.api.validation

    const save = (req, res)=>{
        const articles = { ...req.body}

        if(req.params.id){
            articles.id = req.params.id
        }

        try{
            existsOrError(articles.name, 'Nome não informado')
            existsOrError(articles.description, 'Descrição não indormada')
            existsOrError(articles.categoryId, 'Categoria não informado')
            existsOrError(articles.userId, 'Autor não informado')
            existsOrError(articles.content, 'Conteúdo não informado')
        }catch(msg){
            res.status(400).send(msg)
        }

        if(articles.id){
            app.db('articles').update(articles).where({id: articles.id})
            .then(_=> res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('articles').insert(articles)
            .then(_ => res.status(204).send())
            .catch(err => res.status(204).send(err))
        }

    }
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles').where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usando limit para paginação
    const get = async (req, res)=>{
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)


        app.db('articles').select('id', 'name', 'description')
        .limit(limit).offset(page * limit - limit) // offset é selecionar aparti do resultado
        .then(articles => res.json({data: articles, count, limit}))
        .catch(err => res.status(500).send(err))
    }

    const getById = (req, res)=>{
        // retorna um array e vou pegar o primeiro
        app.db('articles').where({id: req.params.id}).first()
        .then(articles =>{
            // resultado binario e converte para string
            articles.content = articles.content.toString()
            return res.json(articles)
        })
        .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res)=>{
        //id da categoria pai
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(query.categoryWithChildren, categoryId)

        // array de ids
        const ids = categories.rows.map(c => c.id)

        app.db({a: 'articles', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }
    return {save, remove, get, getById, getByCategory}
}