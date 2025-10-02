const express = require('express');
const mongoose = require('mongoose');
const Router = require('./router/routers'); 
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://mukulved07:Tav5SRuyZppKtzoL@cluster0.7ebyt.mongodb.net/twitter-db");
        console.log("MongoDB connected");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); 
    }
};


connectToMongoDB();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from the server!'
    });
});

app.use('/api/user', Router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
