const { response } = require("express");
const Event = require("../models/Event");



const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user');
    
    try {
        if (!events) {
            return res.status(401).json({
                ok: false,
                msg: 'no hay eventos que mostrar'
            });
        }

        res.status(200).json({
            ok: true,
            events: events
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'contactarse con el administrador'
        });
    }
}


const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid;
        await event.save();

        if (!event) {
            return res.status(401).json({
                ok: false,
                msg: 'error al crear el evento'
            });
        }

        res.status(200).json({
            ok: true,
            events: event
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'contactarse con el admin'
        });
    }
}


const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        const eventUser = event.user.toString();

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'no se encontró evento con ese id'
            });
        }

        if (eventUser !== uid) {
            return res.status(404).json({
                ok: false,
                msg: 'no tiene privilegio para editar este evento'
            });
        }

        const newEvent = { ...req.body, user: uid }
        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.status(200).json({
            ok: true,
            event: eventUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "contáctese con el administrador"
        });
    }
}


const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        const eventUser = event.user.toString();

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'no se encontró evento con ese id'
            });
        }

        if (eventUser !== uid) {
            return res.status(404).json({
                ok: false,
                msg: 'no tienes los privilegios para borrar este evento'
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            msg: 'el evento ha sido eliminado'
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contactarse conn el administrador'
        });
    }
}


module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent
};