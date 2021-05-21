import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema({
    title: String,
    ingredients: String,
    instructions: String,
    category: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const RecipeMessage = mongoose.model('RecipeMessage', recipeSchema);

export default RecipeMessage;