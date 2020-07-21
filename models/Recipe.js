import mongoose from 'mongoose';

const Schema = mongoose.Schema

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    username: {
        type: String
    }
})

RecipeSchema.index({
    '$**': "text"
})

export default mongoose.model('Recipe', RecipeSchema)