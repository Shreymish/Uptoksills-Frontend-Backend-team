const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Contact form schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to save contact form data
app.post('/api/contact', (req, res) => {
    const newContact = new Contact(req.body);
    newContact.save()
        .then(() => res.status(201).send('Message sent successfully'))
        .catch(err => res.status(400).send(err));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
