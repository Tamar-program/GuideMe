const TourStation = require('../models/TourStation');

// Function to retrieve all stations
const getAllStations = async (req, res) => {
    try {
        const stations = await TourStation.find().populate('address');
        if (!stations) {
            return res.status(404).json({ error: 'No tours' });
        }
       return res.status(200).json(stations);
    } catch (error) {
      return  res.status(500).json({ error: 'Error retrieving stations' });
    }
};

// Function to retrieve a specific station by its ID
const getStationById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Id is required' });
        }
        const station = await TourStation.findById(id).populate('address');
        console.log(station)
        if (!station) {
            return res.status(404).json({ error: 'Station not found' });
        }
        res.status(200).json(station);
    } catch (error) {
       return res.status(500).json({ error: 'Error retrieving the station' });
    }
};

// Function to create a new station
const createStation = async (req, res) => {
    try {
        const { name, shortDescription, historicalInfo, images, categories, address, gpsLocation, price, duration, accessibility, publicTransportAvailable } = req.body;
        console.log(req.body);

        if (!name || !shortDescription || !categories || !address || price === undefined ||
            duration === undefined) {
            return res.status(400).json({ error: 'Missing required fields: name, shortDescription, categories, address, price, and  duration are required.' });
        }

        // Validate categories
        if (!Array.isArray(categories)) {
            return res.status(400).json({ error: `Invalid categories` });
        }
        const newStation = new TourStation(req.body);

        const savedStation = await newStation.save();

        res.status(201).json(savedStation);
    } catch (error) {
    console.error('Error in createStation:', error);
    res.status(500).json({ error: 'Error creating a new station' });
}

};

// Function to update an existing station
const updateStation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Id is required' });
        }
        const updatedStation = await TourStation.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedStation) {
            return res.status(404).json({ error: 'Station not found' });
        }
        res.status(200).json(updatedStation);
    } catch (error) {
       return res.status(500).json({ error: 'Error updating the station' });
    }
};

// Function to delete a station
const deleteStation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'id is required' });
        }
        const deletedStation = await TourStation.findByIdAndDelete(id);
        if (!deletedStation) {
            return res.status(404).json({ error: 'Station not found' });
        }
       return res.status(200).json({ message: `Station with ID ${id} was successfully deleted` });
    } catch (error) {
       return res.status(500).json({ error: 'Error deleting the station' });
    }
};

module.exports = { getAllStations, getStationById, createStation, updateStation, deleteStation };