const express = require('express');
const router = express.Router();

//views
router.get('/login', (res, req) => {
    res.render('login')
});

router.get('/register', (res, req) => {
    res.render('register')
});


module.exports = router;

i