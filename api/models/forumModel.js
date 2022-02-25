const mongoose = require('mongoose');
Schema = mongoose.Schema;
const forumSchema = new Schema (
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        topic: {
            type: String
        },
        content: {
            type: String
        },
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
) 


module.exports = mongoose.model("Forum", forumSchema);