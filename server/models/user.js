const mongoose = require('mongoose');
const {pick} = require('lodash');

const userSchema = new mongoose.Schema({
    //_id, Se añade de forma automatica
    name: {
        type: String, // tipo de dato
        required: true, // obligatorio
        maxlenght: 50 // maximo 50

    },
    email: {
        type: String, // string
        unique: true, // unico
        required: true // required
        //validar que es un email de verdad

    },
    password: {
        type: String, // string
        required: true, //required
        minlength: 8 // minimo 8
        // reglas de validacion
        // encriptacion
    }
}, {
    strict: true //por defecto es true, asi se le da flexibilidad. es de esquema no de tipado
});

// Se crea una funcion para ver que enviar en la variable user de las variables que estan en esquema userSchema
userSchema.methods.toJSON = function (){
    const user = this;
        //name: user.name
        return pick (user, ['_id', 'name', 'email']);
}
//Los metodos son los que estan asociados a los usuarios
//Los statics son los que estan asociados al modelo y devuelve un modelo es tipo generico


userSchema.statics.findByCredentials = ({email, password}) => {
// Se tomaran email y password porque son los datos que se necesita para loguearse
//email, password
//console.log(email, password);

return User.findOne({
    email, password
})
}


const User = mongoose.model('user', userSchema);

module.exports = User;