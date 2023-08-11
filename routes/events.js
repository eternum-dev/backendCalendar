const { Router } = require('express');
const { validatejwt } = require('../middlewares/validatejwt');
const { getEvents, createEvent, deleteEvent, updateEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { isDate } = require('../helpers/isDate');


const router = Router();

//todas las rutan pasan por la validación del JWT
router.use(validatejwt);


//obtener eventos 
router.get('/', getEvents);

//crear un nuevo eventos 
router.post('/',
    [
        check('title', 'el  titulo es obligatorio').not().isEmpty(),
        check('start', 'la fecha de inicio es obligatoria').custom(isDate),
        check('end', 'la fecha de  finalización es obligatoria').custom(isDate),
        fieldValidator
    ], createEvent);

//actualizar  eventos 
router.put('/:id',
    [
        check('title', 'el  titulo es obligatorio').not().isEmpty(),
        check('start', 'la fecha de inicio es obligatoria').custom(isDate),
        check('end', 'la fecha de  finalización es obligatoria').custom(isDate),
        fieldValidator
    ], updateEvent);


//eliminar  eventos 
router.delete('/:id', deleteEvent);

module.exports = router;