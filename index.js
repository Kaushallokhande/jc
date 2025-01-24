const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const resourceRoutes = require('./routes/resourceRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection failed:', error.message);
});

app.get('/', (req, res) => {
    res.send('Welcome to Jarurat Care API!');
});

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});