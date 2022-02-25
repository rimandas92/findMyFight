const mongoose = require('mongoose');
Schema = mongoose.Schema;
const userSchema = new Schema (
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true
        },
        userName: {
            type: String,
            unique: true
        },
        userType: {
            type: Schema.Types.ObjectId, 
            ref: 'Usertype'
        },
        userTypeCode: {
            type: String
        },
        password: {
            type: String
        },
        phoneNo: {
            type: String
        },
        bio: {
            type: String
        },
        location: {
            type: String
        },
        image: {
            type: String
        },
        description_1: String,
        description_2: String,
        description_3: String,
        description_4: String,
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

// userSchema.virtual('name').get(function() {
//     return this.name; 
// }) 

// userSchema.virtual('image_url').get(function() {
//     const image_url = this.image ? '/image/landlord/profile/' + this.image : 'assets/img/user.jpg';
//     return image_url;
// })

module.exports = mongoose.model("User", userSchema);