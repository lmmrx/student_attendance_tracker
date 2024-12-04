const express = require('express');
const router = express.Router();

//views
router.get('/login', (req, res) => { // Corrected the order here
    res.render('login');
});

router.get('/register', (req, res) => { // Corrected the order here
    res.render('register');
});

module.exports = router;