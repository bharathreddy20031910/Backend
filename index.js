const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });
}

// Define Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String
});

const Student = mongoose.model('Student', studentSchema);

// POST API to create a student
app.post('/students', async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    if (!name || !age || !grade) {
      return res.status(400).json({ error: 'Name, age, and grade are required' });
    }
    const student = new Student({ name, age, grade });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { app, Student };
