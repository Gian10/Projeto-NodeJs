
module.exports = app =>{
    const save = (req, res)=>{
        res.send(req.body)
    }
    // retornando o método
    return {save}
}
