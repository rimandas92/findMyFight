const mongoose = require('mongoose');
Schema = mongoose.Schema;
const newfeedSchema = new Schema (
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String
        },
        image: {
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


module.exports = mongoose.model("Newsfeed", newfeedSchema);