import { useState, useEffect } from 'react';
import { WEATHER_API_CONFIG } from './config';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('metric');
  const [theme, setTheme] = useState('light');

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    
    try {
      // Verify API key is configured
      if (!WEATHER_API_CONFIG.API_KEY) {
        throw new Error('Weather API key not configured');
      }

      // Fetch current weather
      const weatherResponse = await fetch(
        `${WEATHER_API_CONFIG.BASE_URL}/weather?q=${location}&units=${unit}&appid=${WEATHER_API_CONFIG.API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Location not found');
      }
      
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      
      // Fetch forecast
      const forecastResponse = await fetch(
        `${WEATHER_API_CONFIG.BASE_URL}/forecast?q=${location}&units=${unit}&appid=${WEATHER_API_CONFIG.API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Forecast data unavailable');
      }
      
      const forecastData = await forecastResponse.json();
      setForecastData(processForecastData(forecastData));
      
      setLocation(weatherData.name);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const processForecastData = (data) => {
    const dailyForecast = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          high: item.main.temp_max,
          low: item.main.temp_min,
          icon: item.weather[0].icon,
          description: item.weather[0].main,
          date: date
        };
      } else {
        dailyForecast[date].high = Math.max(dailyForecast[date].high, item.main.temp_max);
        dailyForecast[date].low = Math.min(dailyForecast[date].low, item.main.temp_min);
      }
    });
    
    return Object.values(dailyForecast).slice(0, 5);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (location) {
      fetchWeatherData(location);
    }
  };

  // Load default location on first render
  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        
        <SearchBar 
          onSearch={fetchWeatherData} 
          theme={theme}
        />
        
        <div className="flex justify-end mb-4">
          <button 
            onClick={toggleUnit}
            className={`px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-200 hover:bg-blue-300'}`}
          >
            Switch to {unit === 'metric' ? '°F' : '°C'}
          </button>
        </div>
        
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {weatherData && (
          <>
            <CurrentWeather 
              data={weatherData} 
              unit={unit} 
              theme={theme}
            />
            <Forecast 
              data={forecastData} 
              unit={unit} 
              theme={theme}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;