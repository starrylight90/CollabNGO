// controllers/userController.js
import User from "../models/userModel.js";
import { generateToken } from "../utils/jwtUtils.js";

const createUser = async (req, res) => {
  try {
    const { 
      name,
      email,
      password,
      photoUrl,
      description,
      contactInfo,
      socialMediaLinks,
    } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      photoUrl,
      description,
      contactInfo,
      socialMediaLinks,
    });

    // Generate a token for the newly created user
    const token = generateToken(newUser._id, newUser.email);

    // Include the token in the response
    res.status(201).json({
      token,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      photoUrl: newUser.photoUrl,
      description: newUser.description,
      contactInfo: newUser.contactInfo,
      socialMediaLinks: newUser.socialMediaLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid User Data' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name photoUrl description contactInfo socialMediaLinks');

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await User.findById(userId, { _id: 1, email: 1 });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

   // Check if the provided password matches the stored password (plain text comparison)
   if (user.password !== password) {
    // Password is incorrect
    return res.status(401).json({ error: 'Invalid password' });
  }

    // Login successful
    const token = generateToken(user._id, user.email);
 

    res.status(200).json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      description: user.description,
      contactInfo: user.contactInfo,
      socialMediaLinks: user.socialMediaLinks,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export { createUser, getAllUsers, loginUser, getUserById };
