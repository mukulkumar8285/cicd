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
        await mongoose.connect("mongodb+srv://Mukul:tPkutU6yycUVwSxz@cluster0.9sc3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
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
