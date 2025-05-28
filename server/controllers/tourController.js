const Tour = require('../models/Tour');
const TourStation = require('../models/TourStation');

// Function to retrieve all tours
const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        if (!tours) {
            return res.status(404).json({ error: 'No tours' });
        }
        res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving tours' });
    }
};

// Function to retrieve a specific tour by its ID
const getTourById = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById(id).populate('stations');
        if (!tour) {
            return res.status(404).json({ error: 'Tour not found' });
        }
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving the tour' });
    }
};

// Function to create a new tour
const createTour = async (req, res) => {
    try {
        const { _id, stations, estimatedDuration, estimatedPrice, tourStyle } = req.body
        console.log(estimatedDuration, tourStyle)
        const newTour = await Tour.create({ stations, estimatedDuration, estimatedPrice, tourStyle });
        res.status(200).json({ newTour })

    } catch (error) {
        res.status(500).json({ error: 'Error creating a new tour' });
    }
};

// Function to update an existing tour
const updateTour = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedTour) {
            return res.status(404).json({ error: 'Tour not found' });
        }
        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(500).json({ error: 'Error updating the tour' });
    }
};

// Function to delete a tour
const deleteTour = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTour = await Tour.findByIdAndDelete(id);
        if (!deletedTour) {
            return res.status(404).json({ error: 'Tour not found' });
        }
        res.status(200).json({ message: `Tour with ID ${id} was successfully deleted` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting the tour' });
    }
};

const searchTours = async (req, res) => {
    try {
        const {
            maxDuration = 60,
            maxPrice = 25,
            categories,
            accessibility,
            publicTransport
        } = req.body;

        const query = {};

        if (categories && categories.length > 0) {
            query.categories = { $in: categories };
        }

        if (accessibility === true) {
            query.accessibility = true;
        }

        if (publicTransport === true) {
            query.publicTransportAvailable = true;
        }

        const matchedStations = await TourStation.find(query);

        if (matchedStations.length === 0) {
            console.warn("לא נמצאו תחנות מתאימות! בדוק את השאילתה או את הנתונים בבקשה.");
        }

        const matchingTours = [];
        const totalStations = matchedStations.length;
        const tourStyleValue = categories && categories.length > 0 ? categories : ['other'];

        for (let i = 0; i < totalStations; i++) {
            let tourStations = [];
            let totalPrice = 0;
            let totalDuration = 0;

            for (let j = i; j < totalStations; j++) {
                const station = matchedStations[j];

                if (isNaN(station.price) || isNaN(station.duration)) {
                    console.error('Invalid station data:', station);
                    continue;
                }

                if (totalPrice + station.price > maxPrice || totalDuration + station.duration > maxDuration) {
                    if (tourStations.length > 1) {
                        const tour = new Tour({
                            stations: tourStations,
                            estimatedDuration: totalDuration,
                            estimatedPrice: totalPrice,
                            tourStyle: tourStyleValue
                        });
                        // await tour.save();
                        matchingTours.push(tour);
                    }
                    break;
                }

                tourStations.push(station._id);
                totalPrice += station.price;
                totalDuration += station.duration;
            }

            if (tourStations.length > 1) {
                if (!matchingTours.some(t => arraysEqual(t.stations, tourStations))) {
                    const validTourStyles = ['history', 'culinary', 'culture', 'nature', 'art', 'other'];
                    const filteredTourStyleValue = tourStyleValue.filter(style => validTourStyles.includes(style));
                    const tour = new Tour({
                        stations: tourStations,
                        estimatedDuration: totalDuration,
                        estimatedPrice: totalPrice,
                        tourStyle: tourStyleValue
                    });
                    // await tour.save();
                    matchingTours.push(tour);
                }
            }
        }

        console.log('Final matchingTours count:', matchingTours.length);
        if (matchingTours.length === 0) {
            console.warn("לא נמצאו מסלולים תואמים! ייתכן שהנתונים לא מספקים או שהקריטריונים מצמצמים מדי.");
        }
        res.status(200).json(matchingTours);

    } catch (error) {
        console.error('Error generating tours:', error);
        res.status(500).json({ message: 'Error generating tours' });
    }
};

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
        if (typeof a[i].equals === "function") {
            if (!a[i].equals(b[i])) return false;
        } else if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
module.exports = { getAllTours, getTourById, createTour, updateTour, deleteTour, searchTours }