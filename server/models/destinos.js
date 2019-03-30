const mongoose = require ('mongoose');
const {pick} = require ('lodash');

const destinsSchema = new mongoose.Schema({
    destinos: {
        type: String,
        required: true,
        maxlenght: 80
    },
    precio:{
        type: Number,
        required: true
    },
    oferta: {
        type: Number
    }
},{
    strict: true
})
destinsSchema.methods.toJSON = function (){
    const destino = this;
    return pick (destino, ['_id', 'destinos', 'precio']);
}

const Destino = mongoose.model('destino', destinsSchema);
module.exports = Destino;