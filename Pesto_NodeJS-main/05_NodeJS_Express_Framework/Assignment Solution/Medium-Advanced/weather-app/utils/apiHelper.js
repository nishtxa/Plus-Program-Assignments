const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetchWeatherByCities = async (cities, page = 1, limit = 10) => {
    try {
        const cityList = cities.split(',');
        const responses = await Promise.all(
            cityList.map(city => 
                axios.get(`${BASE_URL}/weather`, {
                    params: {
                        q: city,
                        appid: API_KEY,
                        units: 'metric'
                    }
                })
            )
        );
        // Implement pagination
        const startIndex = (page - 1) * limit;
        const paginatedItems = responses.map(res => res.data).slice(startIndex, startIndex + limit);
        return paginatedItems;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return [];
    }
};

const fetchForecastByDays = async (city, days) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast/daily`, {
            params: {
                q: city,
                cnt: days,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        return {};
    }
};

const fetchCurrentWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        return {};
    }
};

module.exports = {
    fetchWeatherByCities,
    fetchForecastByDays,
    fetchCurrentWeather
};
