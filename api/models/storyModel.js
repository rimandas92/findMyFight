const mongoose = require('mongoose');
Schema = mongoose.Schema;

const storySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            default: null
        },
        media: {
            type: String,
            default: null
        },
        storyExpiredAt: {
            type: Date,
            default: null
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

module.exports = mongoose.model("Story", storySchema);