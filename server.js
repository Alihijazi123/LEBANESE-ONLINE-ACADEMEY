const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// إعداد التخزين المؤقت للصور عبر Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  grades: String,
  location: String,
  phone: String,
  image: String
});

const Teacher = mongoose.model('Teacher', teacherSchema);

app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});

// استقبال البيانات عبر FormData مع Multer لقراءة الحقول بشكل صحيح
app.post('/api/teachers', upload.single('image'), async (req, res) => {
  try {
    const { name, subject, grades, location, phone } = req.body;
    
    let imagePath = './images/photo_2026-08-29_00-56-35.jpg'; // صورة افتراضية

    // إذا تم رفع صورة، يمكن حفظها أو استخدام رابط افتراضي مؤقت ريثما نربطه برابط سحابي
    if (req.file) {
      // حالياً سنضع مسار افتراضي أو اسم الملف لضمان عدم حدوث أي خطأ
      imagePath = './images/photo_2026-08-29_00-56-35.jpg';
    }

    const newTeacher = new Teacher({
      name,
      subject,
      grades,
      location,
      phone,
      image: imagePath
    });

    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    console.error('Error adding teacher:', err);
    res.status(400).json({ error: 'Failed to add teacher' });
  }
});

app.delete('/api/teachers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Teacher.findByIdAndDelete(id);
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});