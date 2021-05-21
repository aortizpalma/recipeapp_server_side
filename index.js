import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import recipesRoutes from './routes/recipes.js';

// Initialize express
const app = express();
dotenv.config();


// GENERAL EXRPRESS SETUP
// Limit the size of the images, include bodyParser to properly send the requests, and enable cors.
app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }));
app.use(cors());

// remember to specify the routes after specifying to CORS to prevent network errors.
app.use('/posts', postRoutes);
app.use('/recipes', recipesRoutes);

// Welcome note to the API user
app.get('/', (req, res) => {
    res.send('Hello to recipe app API');
});

// CONNECTION WITH DATABASE (Mongo.db Cloud Atlas)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);