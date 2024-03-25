import express from 'express';
import { PORT, MONGO_URI } from './config.js';
import mongoose from 'mongoose';
import { Book } from './Modules/bookModule.js';

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack Backend! 🚀');
}
);
// Route for saving a new book
app.post('/books', async (req, res) => {
    console.log(req);
    res.status(234).send('Welcome to MERN Stack Tutorial!');
    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.published
        ) {
            return res.status(400).send({
                messege: "Please send all the required fields title, author and publishyear",
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.messege);
        return res.status(500).send({ messege: error.messege });
    }
}
);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("App Connectedd to MongoDB Atlas Database Database");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
