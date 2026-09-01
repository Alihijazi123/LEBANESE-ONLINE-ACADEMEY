const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // مشان نفهم بيانات الـ JSON اللي جايتنا من الفرونت إند
app.use(cors());         // مشان نسمح بالربط

// الاتصال بقاعدة بيانات MongoDB عبر Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// تصميم شكل البيانات (Schema & Model) للأساتذة مثلاً
const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  grades: String,
  location: String,
  phone: String,
  image: String
});

const Teacher = mongoose.model('Teacher', teacherSchema);

// --- الـ API Routes (الجسور بين الفرونت والباك) ---

// 1. جلب كل الأساتذة (GET)
app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});

// 2. إضافة أستاذ جديد (POST)
app.post('/api/teachers', async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add teacher' });
  }
});

// حذف أستاذ بواسطة الـ ID
app.delete('/api/teachers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Teacher.findByIdAndDelete(id);
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
});
// تشغيل السرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});