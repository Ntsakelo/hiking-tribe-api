import express from "express";

import { register, login,allUsers } from "../controllers/authentication";  
import checkAuth from "../middleware/check-auth";

export default (router: express.Router) => {
    router.post("/users/auth/register", register);
    router.post("/users/auth/login", login);
    router.get("/users",checkAuth, allUsers )

}