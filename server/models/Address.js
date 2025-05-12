const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: {
        type: String

    },
    neighborhood: {
        type: String,
        required: true
    },
    house_number: {
        type: Number
    },
    landmark: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourStation'
    }],
    region: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default:"ירושלים"
    },
    postal_code: {
        type: String
    },
    gpsLocation: {
        type: {
            latitude: { type: Number }, // קו רוחב
            longitude: { type: Number} // קו אורך
        },
        // required: true
    },
},{
    timestamps:true
});
module.exports = mongoose.model('Address', addressSchema)