import express, { RequestHandler } from 'express';

import { createUser, getUserByEmail, getUsers } from '../db/users';
import { crypted, checkPassword, genToken }  from '../helpers'; 

export const login: RequestHandler = async (req,res) => {
    try{
         const {email, password} = req.body;
         const user = await getUserByEmail(email).select("+authentication.password");
         if(!user){
            return res.status(401).json({
                message: "Auth failed"
            });
         }else{
            // if(user.authentication.sessionToken){
            //    return res.status(400).json({
            //         message: "User already authorized",
            //     })
            // }
            const expectedHash = await checkPassword(password, user.authentication.password);
            if(!expectedHash){
               return res.status(401).json({
                    message: "Auth failed"
                })
            }else{
               return res.status(200).json({
                  message: "Sign in successful",
                  token: genToken(user.email, user._id.toString())
               })
            }   
         }
    }catch(error){
        console.log(error)
    }
}

export const register: RequestHandler = async (req, res) => {
    try{
       const { email, username, password } = req.body;
       if(!email || !username || !password){
         return res.status(400).json({
             message: "User already exists"
         });
       }  
       
       const existingUser = await getUserByEmail(email);
       
       if (existingUser) {
        return res.status(409).json({
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
        return res.status(400);
    }
}

export const allUsers: RequestHandler = async (req, res) => {
    try{
           const users = await getUsers();
           if(!users){
              return res.status(400).json({
                  message: "Auth failed"
              })
           }else{
              return res.status(200).json({
                  users: users
              })
           }
    }catch(error){
      res.status(400).json({
          message: "Auth failed"
      })
      console.log(error)
    }
}