const environment = {
    production: "production",
    development: "development",
    test: "test"
}
const ENV = process.env.NODE_ENV || environment.development;
// Si no especifica el entorno entrara por defecto a environment.development
console.log(ENV);

// Configuracion de los entornos
const config = {
    [environment.production]: {
        // 
        port: 80,
        MongoDB: {
            port: '',
            host: 'localhost',
            db: 'traveldb'
        }
    },
    [environment.development]: {
        // 
        port: 3000,
        MongoDB: {
            port: '',
            host: 'localhost',
            db: 'traveldb_dev'
        }

    },
    [environment.test]: {
        port: 3000,
        MongoDB: {
            port: '',
            host: 'localhost',
            db: 'traveldb_test'
        }

    }
}
// Se guarda en una constante toda la configuracion del entorno en el que esta
const CONFIG = config[ENV];

if (!CONFIG) {
    // Si no hay guardada una configuracion lanza un error
    throw new Error('NODE_ENV=${ENV} is not a valid environment')
}
// console.log(CONFIG);

//console.log(process.env);

process.env = {
    ...process.env,
    ...CONFIG
    // Los tres puntos antes del objeto colocan todos los clave valor del objeto
    // En el caso anterior se esta concatenando y se crea la suma de objetos
};
console.log(process.env.MongoDB.db);