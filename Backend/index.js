import express from 'express';
import { PORT, MONGO_URI } from './config.js';
import mongoose from 'mongoose';
import { Book } from './Modules/bookModule.js';

const app = express();

app.use(express.json());
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Backend! 🚀');
}
);
// Route for saving a new book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                messege: "Please send all the required fields title, author and publishyear",
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.messege);
        return response.status(500).send({ messege: error.messege });
    }
}
);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("App Connectedd to MongoDB Atlas Database");
        app.listen(PORT, () => {
            console.log(`Server is running on port:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
