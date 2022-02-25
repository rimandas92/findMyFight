const mongoose = require('mongoose');
Schema = mongoose.Schema;

const feedCommentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        feed_id:{
            type: Schema.Types.ObjectId,
            ref: 'Newsfeed'
        },
        name: {
            type: String,
            default: null
        },
        comment:{
            type: String,
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

module.exports = mongoose.model("FeedComment", feedCommentSchema);