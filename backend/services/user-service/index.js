const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();


const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));