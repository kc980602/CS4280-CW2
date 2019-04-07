const express = require('express');
const router = express.Router();

router.get('/browse/albums', (req, res) => {
    res.render('albums', {
        title: 'Browse Albums | Mue'
    });
});

router.get('/album/:id', (req, res) => {
    res.render('album', {
        title: 'Browse Albums | Mue'
    });
});


module.exports = router;