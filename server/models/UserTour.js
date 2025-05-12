const mongoose = require("mongoose")
const { stringify } = require("querystring")

const userTourSchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tourId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserTour', userTourSchema)
