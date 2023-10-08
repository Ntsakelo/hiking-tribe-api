import { Router } from "express";

import { getAllEvents } from "../controllers/events";

export default (router: Router) => {
    router.get('/events', getAllEvents);
}