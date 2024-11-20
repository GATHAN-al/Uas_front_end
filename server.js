const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

// Setup Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hotelDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

// Hashing Password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

// Register Route
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.send('User Registered');
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
    
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
});

// Protect Route (for Home page)
app.get('/home', (req, res) => {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).send('Unauthorized');
        res.send('Welcome to Home Page');
    });
});

// Logout Route (Optional)
app.post('/logout', (req, res) => {
    // Client-side can simply delete the token to logout
    res.send('Logged out');
});

// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
