const express = require('express'),
      router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        return res.status(200).json({
            message: "Welcome to Tenant Alert App, Handover to the Priyanka",
            host: `http://${req.hostname}:${process.env.PORT}`,
            status: true
        })
    } catch (error) {
        throw new Error(error);
    }
})

router.get('/email', async (req, res) => {
    res.status(200).render('../views/partials/confirmYourEmail', {
        message: 'Rakesh'
    });
})

module.exports = router;