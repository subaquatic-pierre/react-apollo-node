import mongoose from 'mongoose';

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    favourites: {
        type: [Schema.Types.ObjectId],
        ref: 'Recipe'
    }
})

export default mongoose.model('User', UserSchema)