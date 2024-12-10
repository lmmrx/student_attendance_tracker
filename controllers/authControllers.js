const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AttendanceManager = require('../models/attendanceManager.js');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const secret = process.env.secret_key;

    try {
        const user = await AttendanceManager.findOne({ email });
        
        if (!user) {
            return res.status(404).send('Invalid username.');
        }

        // Use bcrypt to verify the password
        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(404).send('Password does not match our records.');
        }

        // Generate the JWT
        const token = jwt.sign({ id: user._id.toString() }, secret, { expiresIn: '5m' });

        // Create a cookie and place the JWT inside of it
        res.cookie('jwt', token, { maxAge: 5 * 60 * 1000, httpOnly: true });

        // Send a successful response, you might want to send user info or success message
        //return res.status(200).send('Login successful.');

        res.redirect('/attendance');

    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}

exports.register = async (req, res) => {
    
    const { email, password, confirmPassword } = req.body; 
    
    //console.log(req.body);

    try {
        
        const existingUser = await AttendanceManager.findOne({ email });

        if (existingUser) {
            return res.status(400).send('Email already exists.'); 
        }

        if (password !== confirmPassword) { 
            return res.status(400).send('Passwords do not match.'); 
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const newUser = new AttendanceManager({ 
            email,
            password: hashedPassword
        });

        await newUser.save(); 
        
        res.redirect('/login');
            
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}