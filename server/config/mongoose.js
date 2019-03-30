const mongoose = require('mongoose');
const {
    port,
    db,
    host
} = process.env.MongoDB;

// mongoose.connect('mongodb://localhost:27017/bootcamp');
//mongoose.connect(`mongodb+srv://${host}/${db}`, {
    mongoose.connect(`mongodb://${host}:${port}/${db}`,{
    useNewUrlParser: true
});


module.exports = mongoose;