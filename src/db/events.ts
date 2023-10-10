import mongoose, { ObjectId } from "mongoose";

type Member = {
    participantId: string,
    timestamp: string,
}

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    eventDate: { type: String },
    eventTime: { type: String },
    members: {
        host: { type: Object, required: true },
        co_hosts: { type: Array },
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
export const getParticipantFromEvent = (id: ObjectId, participantId: string) => EventModel.find({
    $and: [
        {_id: id},
        {"members.participants.participantId": participantId}
    ]
});
export const addParticipantToEvent = (id: ObjectId, participant: Member) => EventModel.updateOne(
    { _id: id },
    { $addToSet: {"members.participants": participant } },
);
export const removeParticipantFromEvent = (id: string, participantId: string) => EventModel.updateOne(
    { _id: id },
    { $pull: { "members.participants": { participantId: participantId } } },
);