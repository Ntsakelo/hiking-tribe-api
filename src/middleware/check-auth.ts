import express from "express";
import jwt from "jsonwebtoken";

export default (req: express.Request,res:express.Response, next:express.NextFunction) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.body.userData = decoded;  
        next();
    }catch(error){
        return res.status(401).json({
            message: "Auth failed"
        })
    } 

}