import { RequestHandler } from "express";

import { createEvent, getEvents } from "../db/events";

export const getAllEvents: RequestHandler = async (req, res) => {
  try{
       const events = await getEvents();

       return res.status(200).json(events);
  }catch(error){
    console.log(error);
    return res.sendStatus(400)
  }
}

export const addEvent: RequestHandler = async (req, res) => {
   try{
   }catch(error){
    console.log(error);
   }
}