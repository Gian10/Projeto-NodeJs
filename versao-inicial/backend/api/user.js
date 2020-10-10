// criptografar senha
const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    // chamar os método de validation
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    // método de encripção de senhas
    const encryptPassword = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res)=>{
        const user = { ...req.body}
        
        // verificar se tem id na requisição
        if(req.params.id) {
            user.id = req.params.id
        }

        try{
            existsOrError(user.name, "Nome não informado")
            equalsOrError(user.password, user.confirmPassword, "senha não conferem")

            // verificar se o usuario existe no db
            const userFromDB = await app.db('users').where({email: user.email}).first()
            if(!user.id){
                notExistsOrError(userFromDB, 'Usuario já cadastrado')
            }

        }catch(msg){
            return res.status(400).send(msg)
        }

        // invocar o método e criptrofar a senha
        user.password = encryptPassword(req.body.password)

        // deletar a confirmação da senha
        delete user.confirmPassword

        if(user.id){
            app.db('users').update(user).where({id: user.id})
            .then(_ => res.status(200).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('users').insert(user)
            .then(_ => res.status(201).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) =>{
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res)=>{
        app.db('users')
        .select('id', 'name', 'email', 'admin')
        .where({id: req.params.id}).first()
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
    }
    // retornando o método
    return {save, get, getById}
}
