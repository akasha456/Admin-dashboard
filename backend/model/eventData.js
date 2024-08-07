const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    timings: { type: String, required: true },
    days: { type: [String], required: true },
    venue: { type: String, required: true },
    picture: { type: String, default: 'https://default-event-picture.com' },
});

const EventData = mongoose.model('eventdetails', eventSchema);
module.exports = EventData;
