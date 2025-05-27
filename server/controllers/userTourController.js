const UserTour = require('../models/UserTour');
const User = require('../models/User');
const Tour = require('../models/Tour');

// Function to retrieve all user tours
const getAllUserTours = async (req, res) => {
    try {
       
        const userTours = await UserTour.find()
            .populate('userId', 'name email') // Populate user details
            .populate({
                path: 'tourId',
                select: 'tourStyle estimatedDuration estimatedPrice stations',
                populate: {
                    path: 'stations',
                    model: 'TourStation' // ודא שזה שם המודל שלך
                }
            });
        res.status(200).json(userTours);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user tours' });
    }
};

// Function to retrieve user tours by ID
const getUserToursByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid userId format' });
        }

        console.log("User ID:", id);

        const userTours = await UserTour.find({ userId: id })
            .populate('userId', 'name email')
            .populate({
                path: 'tourId',
                select: 'tourStyle estimatedDuration estimatedPrice stations',
                populate: {
                    path: 'stations',
                    model: 'TourStation' // ודא שזה שם המודל שלך
                }
            });

        console.log("Retrieved user tours:", userTours);
        if (!userTours || userTours.length === 0) {
            return res.status(200).json({ error: 'No tours found for this user' });
        }

        res.status(200).json(userTours);
    } catch (error) {
        console.error("Error retrieving tours for the user:", error);
        return res.status(500).json({ error: 'Error retrieving tours for the user' });
    }
};

// Function to create a new user tour
const createUserTour = async (req, res) => {
    try {
        const { userId, tourId } = req.body;

        if (!userId || !tourId) {
            return res.status(400).json({ error: 'userId and tourId are required' });
        }
        if (!userId.match(/^[0-9a-fA-F]{24}$/) || !tourId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format for userId or tourId' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const tour = await Tour.findById(tourId);
        if (!tour) {
            return res.status(404).json({ error: 'Tour not found' });
        }

        const newUserTour = await UserTour.create({ userId, tourId });
      return  res.status(201).json(newUserTour);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating user tour' });
    }
};

// Function to update an existing user tour
const updateUserTour = async (req, res) => {
    try {
        const { id } = req.params;
        const { tourId } = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        if (tourId && !tourId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format for tourId' });
        }

        const updatedUserTour = await UserTour.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedUserTour) {
            return res.status(404).json({ error: 'User tour not found' });
        }

       return res.status(200).json(updatedUserTour);
    } catch (error) {
       return res.status(500).json({ error: 'Error updating the user tour' });
    }
};

// Function to delete a user tour
const deleteUserTours = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const deletedUserTour = await UserTour.findByIdAndDelete(id);

        if (!deletedUserTour) {
            return res.status(404).json({ error: 'User tour not found' });
        }

        res.status(200).json({ message: `User tour with ID ${id} was successfully deleted` });
    } catch (error) {
       return res.status(500).json({ error: 'Error deleting the user tour' });
    }
};

module.exports = { 
    getAllUserTours, 
    getUserToursByUserId, 
    createUserTour, 
    updateUserTour, 
    deleteUserTours 
};