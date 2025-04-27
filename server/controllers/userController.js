const User = require("../models/User")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().lean().select('password')

        res.status(200).json(users)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Server error, Unable to fetch users" })
    }


}

const createUser = async (req, res) => {
    try {
        const { name, email, passord } = req.body
// בדיקה אם כל השדות הנדרשים נשלחו
        if (!name || !email || !passord) {
            res.status(400).json({ msg: "All fields are required." })
        }
// בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = await User.create({ name, email, password });

        const result = await User.find()
    res.status(200).json({result})
    }
catch(error){
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
}

}

// שליפת משתמש יחיד לפי ID
const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error.' });
    }
  };
  
  // עדכון משתמש לפי ID
  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true, runValidators: true }
      ).select('-password');
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      return res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error.' });
    }
  };
  
  // מחיקת משתמש לפי ID
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error.' });
    }
  };
  
  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
  };

