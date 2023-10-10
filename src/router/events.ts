import { Router } from "express";

import { getAllEvents,addEvent, addParticipant, removeParticipant } from "../controllers/events";
import checkAuth from "../middleware/check-auth";

export default (router: Router) => {
    router.get('/events', getAllEvents);
    router.post('/events/create', checkAuth, addEvent);
    router.post('/events/participants/add', checkAuth, addParticipant);
    router.post('/events/participants/remove', checkAuth, removeParticipant);
}