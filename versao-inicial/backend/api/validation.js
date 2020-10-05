
module.exports = app =>{
    existsOrError = (value, msg) =>{
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    notExistsOrError = (value, msg) =>{
        try{
            existsOrError(value, msg)
        }catch(msg){
            return
        }
        throw msg
    }
    
    equalsOrError = (valueA, valueB, msg) =>{
        if(valueA != valueB) throw msg
    }

    return {existsOrError, notExistsOrError, equalsOrError}
}





