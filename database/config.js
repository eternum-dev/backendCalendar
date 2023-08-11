const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB levantada');
    }
    catch (error) {
        console.log(error);
        throw new Error('error al inicializar base de datos ')
    }
}


module.exports = {
    dbConnection,
}