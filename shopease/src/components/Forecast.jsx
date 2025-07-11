const Forecast = ({ data, unit, theme }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((day, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}
          >
            <p className="font-semibold">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            {day.icon && (
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                alt={day.description} 
                className="mx-auto my-2"
              />
            )}
            <p className="capitalize text-sm mb-2">{day.description}</p>
            <div className="flex justify-center space-x-2">
              <span className="font-bold">{Math.round(day.high)}°{unit === 'metric' ? 'C' : 'F'}</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {Math.round(day.low)}°{unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;