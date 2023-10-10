import { RequestHandler } from "express";

import {
  createEvent,
  getEvents,
  addParticipantToEvent,
  getParticipantFromEvent,
  removeParticipantFromEvent
} from "../db/events";

export const getAllEvents: RequestHandler = async (req, res) => {
  try {
    const events = await getEvents();

    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addEvent: RequestHandler = async (req, res) => {
  try {
    const { title, description, eventDate, eventTime, location, coHosts } = req.body;
    if (!title || !description || !eventDate || !eventTime || !location) {
      return res.status(406).json({
        message: "Missing details",
      });
    }
    await createEvent({
      title,
      description,
      location,
      eventDate,
      eventTime,
      members: {
        host: {hostId:req.body.userData.userId},
        co_hosts: coHosts,
        participants: [{participantId:req.body.userData.userId, timestamp: new Date().toString()}]
      },
    });
    return res.status(201).json({
      message: "Event created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const addParticipant: RequestHandler = async (req, res) => {
  try {
    const user = req.body.userData;
    const { eventId } = req.body;
    const checkUser = await getParticipantFromEvent(eventId, user.userId);
    if(checkUser.length > 0){
      return res.status(409).json({
        message: "participant already added"
      })
    }
    const userInfo = {
      participantId: user.userId,
      timestamp: new Date().toString(),
    };

    if (!user) {
      return res.status(401).json({
        message: "Auth failed",
      });
    } else {
      await addParticipantToEvent(eventId, userInfo);
      return res.status(200).json({
        message: "Participant added successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeParticipant: RequestHandler = async (req, res) => {
    try{
          const {eventId, participantId} = req.body;
          const checkUser = await getParticipantFromEvent(eventId, participantId);
          if(checkUser.length <= 0) {
            return res.status(400).json({
              message: "User does not exist"
            })
          }
          if(!eventId || !participantId){
            return res.status(400).json({
              message: "missing details!"
            })
          }else{
            await removeParticipantFromEvent(eventId, participantId);
            return res.status(200).json({
              message: "User succesfully removed"
            })
          }
    }catch(error){
      res.status(400).json({
        message: "Auth failed"
      })
      console.log(error)
    }
}