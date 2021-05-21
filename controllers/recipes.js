import mongoose from 'mongoose';
import RecipeMessage from '../models/recipeMessage.js'

export const getRecipes = async (req, res) => {
    try {
        const recipeMessages = await RecipeMessage.find();
        
        console.log(recipeMessages);

        res.status(200).json(recipeMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createRecipe = async (req, res) => {
    const recipe = req.body;

    const newRecipe = new RecipeMessage(recipe);

    try {
        await newRecipe.save();

        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateRecipe = async (req, res) => {
    const { id: _id } = req.params;
    const recipe = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No recipe with that id');

    const updatedRecipe = await RecipeMessage.findByIdAndUpdate(_id, {...recipe, _id }, { new: true });

    res.json(updatedRecipe);
}

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No recipe with that id');

    await RecipeMessage.findByIdAndRemove(id);

    console.log('DELETE');

    res.json({ message: 'Recipe deleted sucessfully' });
}

export const likeRecipe = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No recipe with that id');

    const recipe = await PostMessage.findById(id);
    const updatedRecipe = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, {new: true} );

    res.json(updatedRecipe);
}