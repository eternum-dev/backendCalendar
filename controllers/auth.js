const { response } = require('express');
const { hashSync, genSaltSync, compareSync } = require('bcrypt')
const User = require('../models/User');
const { triggerJwt } = require('../helpers/jwt');


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'el usuario ya existe con ese correo',
            });
        }

        user = new User(req.body);

        //encriptar contraseña
        const salt = genSaltSync();
        user.password = hashSync(password, salt);

        await user.save();

        // generar JWT 
        const token = await triggerJwt(user.id, user.name);


        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {

        console.log(error);

        res.status(501).json({
            ok: false,
            msg: 'contactarse con el administración)'
        });
    }
}



const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msj: 'el email no registrado'
            });
        }
        //  confirmar password
        const validPassword = compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msj: 'contraseña no incorrecta'
            });
        }
        // generar JWT 
        const token = await triggerJwt(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'contacte con el administrador'
        });
    }
}



const reNewUser = async (req, res = response) => {
    const uid = req.uid;
    const name = req.name;
    const token = await triggerJwt(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}


module.exports = {
    createUser,
    loginUser,
    reNewUser
}