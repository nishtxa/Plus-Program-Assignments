const apiHelper = require('../utils/apiHelper');

exports.getWeatherByCities = async (req, res) => {
    const { cities, page, limit } = req.query;
    const data = await apiHelper.fetchWeatherByCities(cities, page, limit);
    res.json(data);
};

exports.getForecastByDays = async (req, res) => {
    const { city, days } = req.query;
    const data = await apiHelper.fetchForecastByDays(city, days);
    res.json(data);
};

exports.getCurrentWeather = async (req, res) => {
    const { city } = req.query;
    const data = await apiHelper.fetchCurrentWeather(city);
    res.json(data);
};
