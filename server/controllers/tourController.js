const Tour = require('../models/Tour');

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
        if (!tFour) {
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
        const newTour = new Tour(req.body);
        const savedTour = await newTour.save();
        res.status(201).json(savedTour);
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

module.exports = { getAllTours, getTourById, createTour, updateTour, deleteTour };