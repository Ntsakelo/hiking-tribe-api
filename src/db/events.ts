import mongoose from "mongoose";

type Member = {
    id: string,
    timestamp: string,
}

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: String },
    eventTime: { type: String },
    Members: {
        hosts: { type: Array, required: true },
        participants: { type: Array },
    },
});

export const EventModel = mongoose.model('event', EventSchema);

export const createEvent = (values: Record<string, any>) => new EventModel(values)
    .save().then(event => event.toObject());
export const getEvents = () => EventModel.find();
export const getEventById = (id: string) => EventModel.findById(id);
export const updateEventById = (id: string, values: Record<string, any>) => EventModel.
    findByIdAndUpdate(id, values);
export const deleteEventById = (id: string) => EventModel.findOneAndDelete({ _id: id });
export const addParticipantToEvent = (id: string, participant: Member) => EventModel.updateOne(
    { _id: id },
    { $addToSet: { "Members.participants": participant } },
);
export const removeParticipantFromEvent = (id: string, participantId: string) => EventModel.updateOne(
    { _id: id },
    { $pull: { "Members.participants": { id: participantId } } },
);