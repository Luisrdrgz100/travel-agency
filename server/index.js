require('./config'); // Inicia la config de la app
const express = require('express'); // Importa express

const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs);


hbs.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerPartials(`${__dirname}/views/partials`);


const app = express(); // Crea una instancia de express
const router = require('./routes') // Importa las routes
const port = process.env.port || 3000; // Si no hay un puerto se utilizara el 3000

app.use(express.json()); // Se parsea el formato a json

app.set('view engine', 'hbs');

app.set('views',`${__dirname}/views`);
 
/**
 * __filename = ruta desde/hasta el archivo actual
 * __dirname = ruta dsde hasta la carpeta actual
 */
app.use('/', express.static(`${__dirname}/public`))    // Para decir que es una carpeta publica que se muestra al cliente
app.use(router); // se crea la instancia para uso de routes

app.get('/hbs', (req, res) =>{
    res.render('prueba.hbs', {
        title: 'prueba',
        users: [
            {id: 1, name:'Luis'},
            {id: 2, name: 'Alexis'},
            {id: 3, name: 'Rafael'}
    ],
    admin:{
        name: 'Luis',
        fullname: 'Luis Rodriguez'
    },
    layout: 'template'
    }); // render renderiza de acuerdo al view engine y se envian variables
})


///////body principal////////

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'home',
        layout: 'template'
    })
})

///////cuerpo de viajes////////

app.get('/destinos', (req, res) => {
    res.render('destinos.hbs', {
        title: 'home',
        layout: 'template'
    })
})
///////////quienes somos//////////////
app.get('/nosotros', (req, res) => {
    res.render('quienessomos.hbs',{
        title: 'nosotros',
        layout:'template'
    })
})



app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`)
});