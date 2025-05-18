const mongoose = require('mongoose');

// Creating the schema for tours
const tourSchema = new mongoose.Schema({
  stations: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to the TourStation schema
      ref: 'TourStation' // Name of the model being referenced
    }
  ],
  estimatedDuration: {
    type: Number, // Estimated duration (in minutes or hours)
    default: 60 // Default value is 60 if not provided
  },
  estimatedPrice: {
    type: {
      min: Number, // Minimum price
      max: Number  // Maximum price
    },
  },
  tourStyle: {
    type: [String], // Style of the tour
    enum: ['history', 'culinary', 'culture', 'nature', 'art', 'other'], // Allowed values
    default: "other"
  }
}, {
  timestamps: true
});

// Creating the model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;