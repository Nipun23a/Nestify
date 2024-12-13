const express = require('express');
const mongoose = require('mongoose');
const universityRoutes = require('./routes/universityRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err))

app.use('/api/universities', universityRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));