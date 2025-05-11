const Address = require('../models/Address');

const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.find()
        if(!addresses){
            return res.status(404).json({ error: 'No addresses' });
        }
        res.status(200).json(addresses)
    }
    catch (err) {
        res.status(500).json({ error: 'Error retrieving addresses' });
    }
}

const getAddressById=async(req,res)=>{
    try{
        const {id} = req.params
        const address=await Address.findById(id)
        if(!address){
            return res.status(404).json({ error: 'address not found' });
        }
        res.status(200).json(address)
    }
    catch(err){
        res.status(500).json({ error: 'Error retrieving address' });
    }
}

const createAddress = async (req, res) => {
    try {
        const { street, neighborhood, house_number, landmark, region, postal_code, latitude,longitude } = req.body;

        // בדיקות תקינות ידניות
        if (!neighborhood) {
            return res.status(400).json({ message: 'Neighborhood is required ' });
        }

        if (!region ) {
            return res.status(400).json({ message: 'Region is required ' });
        }


        // יצירת מסמך חדש
        const newAddress = new Address({
            street,
            neighborhood,
            house_number,
            landmark,
            region,
            postal_code,
            gpsLocation:{latitude,
            longitude }
        });

        // שמירת הכתובת במסד הנתונים
        const savedAddress = await newAddress.save();

        res.status(201).json({ message: 'Address created successfully', data: savedAddress });
    } catch (error) {
        res.status(500).json({ message: 'Error creating address', error: error.message });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { id } = req.params; // מזהה הכתובת לעדכון
        const updates = req.body; // הנתונים לעדכון

        // בדיקות תקינות ידניות
       
        if (updates.house_number !== undefined && updates.house_number <= 0) {
            return res.status(400).json({ message: 'House number must be a positive number' });
        }

        

        if (updates.postal_code && !/^\d{5,7}$/.test(updates.postal_code)) {
            return res.status(400).json({ message: 'Postal code must be between 5 and 7 digits' });
        }

        if (updates.gpsLocation) {
            if (typeof updates.gpsLocation.latitude !== 'number' || typeof updates.gpsLocation.longitude !== 'number') {
                return res.status(400).json({ message: 'Valid GPS location (latitude and longitude) is required' });
            }
        }

        // עדכון המסמך במסד הנתונים
        const updatedAddress = await Address.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({ message: 'Address updated successfully', data: updatedAddress });
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error: error.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params; // מזהה הכתובת למחיקה

        // בדיקה אם המזהה תקין
        if (!id) {
            return res.status(400).json({ message: 'Address ID is required' });
        }

        // מחיקת המסמך ממסד הנתונים
        const deletedAddress = await Address.findByIdAndDelete(id);

        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({ message: 'Address deleted successfully', data: deletedAddress });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address', error: error.message });
    }
};
module.exports = { getAllAddresses, getAddressById, createAddress, updateAddress, deleteAddress };