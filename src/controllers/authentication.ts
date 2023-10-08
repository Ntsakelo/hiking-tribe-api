import express, { RequestHandler } from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { crypted }  from '../helpers'; 
export const register: RequestHandler = async (req, res) => {
    try{
       const { email, username, password } = req.body;
       if(!email || !username || !password){
         return res.sendStatus(400);
       }  
       
       const existingUser = await getUserByEmail(email);
       
       if (existingUser) {
        return res.sendStatus(409).json({
            message: 'email exists'
        });
       }else{
           const user = await createUser({
            email,
            username,
            authentication: {
                password: await crypted(password),
            },
           });
           return res.status(201).json({message: 'User created'}).end(); 
       }  
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}