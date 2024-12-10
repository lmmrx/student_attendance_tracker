const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers.js');
const studentController = require('../controllers/studentController.js');

//views
router.get('/login', (req, res) => { 
    res.render('login');
});

router.get('/register', (req, res) => { 
    res.render('register');
});

//create routes for controllers actions
router.post('/login', authController.login);
router.post('/register', authController.register);
// router.post('/logout', authController.logout);

//student routes
router.get('/attendance', studentController.getHome);
router.post('/deleteStudent', studentController.deleteStudent);
router.post('/delete', studentController.deleteAllRecords);
router.get('/api/records', studentController.getAllRecords);
router.post('/addstudent', studentController.addStudent);


module.exports = router;