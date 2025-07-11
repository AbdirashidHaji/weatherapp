const CurrentWeather = ({ data, unit, theme }) => {
  const weatherIcon = data.weather[0].icon 
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` 
    : '';
  
  return (
    <div className={`mb-8 p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">{data.name}, {data.sys.country}</h2>
          <p className="text-lg">
            {new Date(data.dt * 1000).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <div className="flex items-center mt-2">
            {weatherIcon && <img src={weatherIcon} alt={data.weather[0].description} className="w-16 h-16" />}
            <span className="text-3xl ml-2">{Math.round(data.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</span>
          </div>
          <p className="capitalize">{data.weather[0].description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
            <p>Humidity</p>
            <p className="text-xl font-semibold">{data.main.humidity}%</p>
          </div>
          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
            <p>Wind Speed</p>
            <p className="text-xl font-semibold">{data.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
          </div>
          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
            <p>Pressure</p>
            <p className="text-xl font-semibold">{data.main.pressure} hPa</p>
          </div>
          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
            <p>Feels Like</p>
            <p className="text-xl font-semibold">{Math.round(data.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;