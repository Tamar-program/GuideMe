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
        const tour = await Tour.findById(id);
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
        // if (!email || !password) {
        //   res.status(400).json({ msg: "All fields are required." })
        // }
        console.log(estimatedDuration, tourStyle)
        const existingUser = await User.findOne({ _id });
        console.log(existingUser)
        if (existingUser) {
          return res.status(400).json({ message: 'Tour already exists.' });
        }
        const newTour = await Tour.create({ stations, estimatedDuration, estimatedPrice, tourStyle });
        const result = await Tour.find()
        res.status(200).json({ result })

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

// Function to search for tours based on criteria
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i].toString() !== b[i].toString()) return false;
    }
    return true;
}

const searchTours = async (req, res) => {
    try {
        const {
            maxDuration,
            maxPrice,
            categories,
            accessibility,
            publicTransport
        } = req.body;

        const query = {};

        if (categories && categories.length > 0) {
            query.categories = { $in: categories };
        }

        if (accessibility) {
            query.accessibility = true;
        }

        if (publicTransport) {
            query.publicTransportAvailable = true;
        }

        const matchedStations = await TourStation.find(query);
        const matchingTours = [];
        const totalStations = matchedStations.length;

        // Set tourStyle to the full categories array or ['other'] if empty
        const tourStyleValue = categories && categories.length > 0 ? categories : ['other'];

        for (let i = 0; i < totalStations; i++) {
            let tourStations = [];
            let totalPrice = 0;
            let totalDuration = 0;

            for (let j = i; j < totalStations; j++) {
                const station = matchedStations[j];

                if (totalPrice + station.price > maxPrice || totalDuration + station.duration > maxDuration) {
                    if (tourStations.length > 1) {
                        const tour = new Tour({
                            stations: tourStations,
                            estimatedDuration: totalDuration,
                            estimatedPrice: {
                                min: totalPrice,
                                max: totalPrice
                            },
                            tourStyle: tourStyleValue
                        });

                        await tour.save();
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
                    const tour = new Tour({
                        stations: tourStations,
                        estimatedDuration: totalDuration,
                        estimatedPrice: {
                            min: totalPrice,
                            max: totalPrice
                        },
                        tourStyle: tourStyleValue
                    });

                    await tour.save();
                    matchingTours.push(tour);
                }
            }
        }

        res.status(200).json(matchingTours);

    } catch (error) {
        console.error('Error generating tours:', error);
        res.status(500).json({ message: 'Error generating tours' });
    }
};

module.exports = { getAllTours, getTourById, createTour, updateTour, deleteTour, searchTours }