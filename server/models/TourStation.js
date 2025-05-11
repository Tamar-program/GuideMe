const mongoose = require('mongoose');

// יצירת הסכמה לתחנות
const tourStationSchema = new mongoose.Schema({
    idStation: {
        type: mongoose.Schema.Types.ObjectId, // מזהה ייחודי אוטומטי
        required: true,
        auto: true
    },
    name: {
        type: String, // שם התחנה
        required: true,
        trim: true
    },
    shortDescription: {
        type: String, // תיאור קצר
        required: true,
        trim: true
    },
    historicalInfo: {
        type: String, // מידע היסטורי
        required: false,
        trim: true
    },
    images: {
        type: [String], // מערך של קישורים לתמונות
        required: false
    },
    categories: {
        type: [String], // קטגוריות (כמו היסטוריה, קולינריה)
        required: true,
        enum: ['history', 'culinary', 'culture', 'nature', 'art', 'other']
    },
    address: {
        type: String, // כתובת
        required: true,
        trim: true
    },
    gpsLocation: {
        type: {
            latitude: { type: Number, required: true }, // קו רוחב
            longitude: { type: Number, required: true } // קו אורך
        },
        required: true
    },
    accessibility: {
        type: Boolean, // רמת נגישות (נגיש/לא נגיש)
        default: false
    }
}, {
    timestamps: true
});

// יצירת מודל
const TourStation = mongoose.model('TourStation', tourStationSchema);

module.exports = TourStation;