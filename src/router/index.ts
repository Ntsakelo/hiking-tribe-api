import express from "express";

import authentication from "./authentication";
import events from "./events";

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    events(router);

    return router;
};