const mongoose = require('mongoose');

const tourStationSchema = new mongoose.Schema({
    // idStation: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     auto: true
    // },
    name: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    historicalInfo: {
        type: String,
        required: false,
        trim: true
    },
    images: {
        type: [String],
        required: false
    },
    categories: {
        type: [String],
        required: true,
        enum: ['history', 'culinary', 'culture', 'nature', 'art', 'other']
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    accessibility: {
        type: Boolean,
        default: false
    },
    publicTransportAvailable: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const TourStation = mongoose.model('TourStation', tourStationSchema);

module.exports = TourStation;