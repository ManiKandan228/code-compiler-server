const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating OTP
const session = require('express-session'); // For storing OTP in session

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'manimanip1622@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true, 
  debug: true,  
});


// Send OTP to the user's email
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase(); // Example: 'A1B2C3'

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    req.session.otp = otp;
    req.session.email = email; 

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Verify OTP
const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: 'OTP is required' });
  }

  if (otp === req.session.otp && email === req.session.email) {
    req.session.isOtpVerified = true; // Set a flag to indicate that OTP is verified
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP or email' });
  }
};

// Register user after OTP verification
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  if (!req.session.isOtpVerified) {
    return res.status(400).json({ message: 'Please verify the OTP before signing up' });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        token,
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Failed to register user' });
  }
};

// User login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      return res.json({
        _id: user._id,
        username: user.username,
        token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Failed to log in' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.json({
        _id: user._id,
        username: user.username,
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, sendOtp, verifyOtp };
