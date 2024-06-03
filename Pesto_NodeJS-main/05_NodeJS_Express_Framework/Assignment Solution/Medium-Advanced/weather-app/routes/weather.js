const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/cities', weatherController.getWeatherByCities);
router.get('/forecast', weatherController.getForecastByDays);
router.get('/current', weatherController.getCurrentWeather);

module.exports = router;
