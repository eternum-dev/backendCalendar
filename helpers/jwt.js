const jwt = require('jsonwebtoken');



const triggerJwt = (uid, name) => {

    return new Promise((resolved, reject) => {

        const payload = { uid, name };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
            
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('no se pudo generar el token');
            }

            resolved(token);
        });
    })
}




module.exports = {
    triggerJwt
}