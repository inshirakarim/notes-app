const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/user', userRouter);
app.get('/', (req, res) => res.json({ msg: 'Welcome to notes app!!!!' }));

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
 mongoose.connect('mongodb+srv://kariminshira:kvq8BaPCVx01XXzJ@cluster0.7dlxsvw.mongodb.net/notes', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "notes" });

const host = '127.0.0.1'; // Bind to the local loopback interface
const port = 3000;
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
