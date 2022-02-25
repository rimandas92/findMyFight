const mongoose = require('mongoose');
Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String
        },
        venue: {
            type: String
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        eventDate: {
            type: Date
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

module.exports = mongoose.model("Event", eventSchema);