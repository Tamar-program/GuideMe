const mongoose = require('mongoose');

// יצירת הסכמה למסלולים
const tourSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId, // מזהה ייחודי אוטומטי
    required: true,
    auto: true // מזהה שנוצר אוטומטית
  },
  stations: {
    type: [String], // מערך של תחנות לפי סדר
    required: true
  },
  estimatedDuration: {
    type: Number, // משך זמן משוער (בדקות או שעות)
    required: true
  },
  estimatedPrice: {
    type: {
      min: Number, // מחיר מינימלי
      max: Number  // מחיר מקסימלי
    },
    required: true
  },
  tourStyle: {
    type: String, // סגנון הסיור
    enum: ['historical', 'cultural', 'adventure', 'nature', 'other'], // ערכים אפשריים
    required: true
  }
});

// יצירת מודל
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;