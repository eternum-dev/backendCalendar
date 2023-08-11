const { Router } = require('express');
const { createUser, loginUser, reNewUser } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { validatejwt } = require('../middlewares/validatejwt');

const router = Router();



router.post(
    '/new',
    //middlewares
    [
        check('name', 'no puede estar vacío').not().isEmpty(),
        check('email', 'el email es un campo obligatorio').isEmail(),
        check('password', 'la contraseña no puede menor a 6 dígitos').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser
);


router.post(
    '/',
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'debe tener al menos 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser
);


router.get('/renew', validatejwt, reNewUser);





module.exports = router;