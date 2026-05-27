import { useState, useEffect, useRef } from 'react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0f172a;
    --surface: #1e293b;
    --surface-alt: #334155;
    --accent: #0ea5e9;
    --accent-hover: #0284c7;
    --text: #e2e8f0;
    --text-muted: #94a3b8;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --sunny: #fbbf24;
    --rainy: #60a5fa;
    --cloudy: #cbd5e1;
    --storm: #a855f7;
    --snowy: #e0f2fe;
  }

  body {
    background: linear-gradient(135deg, var(--bg) 0%, #1a2f4b 100%);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .weather-app {
    min-height: 100vh;
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .header {
    margin-bottom: 40px;
    text-align: center;
  }

  .header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    background: linear-gradient(135deg, var(--accent) 0%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .header p {
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .search-input {
    padding: 12px 16px;
    border: 2px solid var(--surface-alt);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text);
    font-size: 1rem;
    width: 300px;
    transition: all 0.3s;
    font-family: 'Inter', sans-serif;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 20px rgba(14, 165, 233, 0.3);
  }

  .search-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1rem;
  }

  .search-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(14, 165, 233, 0.4);
  }

  .search-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .error-message {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid var(--danger);
    color: #fca5a5;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
  }

  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 40px;
    color: var(--accent);
  }

  .spinner {
    width: 30px;
    height: 30px;
    border: 3px solid var(--surface-alt);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .weather-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }

  .current-weather {
    background: linear-gradient(135deg, var(--surface) 0%, rgba(30, 41, 59, 0.5) 100%);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 16px;
    padding: 40px;
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    grid-column: 1;
  }

  .current-weather.sunny {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, var(--surface) 100%);
    border-color: rgba(251, 191, 36, 0.3);
  }

  .current-weather.rainy {
    background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, var(--surface) 100%);
    border-color: rgba(96, 165, 250, 0.3);
  }

  .current-weather.cloudy {
    background: linear-gradient(135deg, rgba(203, 213, 225, 0.05) 0%, var(--surface) 100%);
    border-color: rgba(203, 213, 225, 0.2);
  }

  .weather-icon-large {
    font-size: 5rem;
    margin-bottom: 20px;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .temperature-display {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 5px;
    color: var(--text);
  }

  .weather-description {
    font-size: 1.3rem;
    color: var(--text-muted);
    margin-bottom: 10px;
    text-transform: capitalize;
  }

  .feels-like {
    font-size: 1rem;
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  .location {
    font-size: 1.1rem;
    color: var(--accent);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    grid-column: 2;
  }

  .metric-card {
    background: rgba(148, 163, 184, 0.05);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 12px;
    padding: 16px;
    transition: all 0.3s;
  }

  .metric-card:hover {
    background: rgba(148, 163, 184, 0.1);
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .metric-label {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 5px;
  }

  .metric-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }

  .metric-icon {
    font-size: 1.5rem;
    margin-right: 8px;
  }

  .forecast-section {
    background: linear-gradient(135deg, var(--surface) 0%, rgba(30, 41, 59, 0.5) 100%);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 16px;
    padding: 30px;
    backdrop-filter: blur(10px);
    margin-bottom: 30px;
  }

  .forecast-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .hourly-forecast {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 10px;
  }

  .hourly-forecast::-webkit-scrollbar {
    height: 6px;
  }

  .hourly-forecast::-webkit-scrollbar-track {
    background: rgba(148, 163, 184, 0.1);
    border-radius: 10px;
  }

  .hourly-forecast::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 10px;
  }

  .hourly-card {
    background: rgba(148, 163, 184, 0.05);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 12px;
    padding: 15px;
    min-width: 120px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
  }

  .hourly-card:hover {
    background: rgba(14, 165, 233, 0.1);
    border-color: var(--accent);
    transform: translateY(-4px);
  }

  .hourly-time {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .hourly-icon {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  .hourly-temp {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 5px;
  }

  .hourly-condition {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .daily-forecast {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .daily-card {
    background: rgba(148, 163, 184, 0.05);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s;
  }

  .daily-card:hover {
    background: rgba(14, 165, 233, 0.1);
    border-color: var(--accent);
    transform: translateY(-4px);
  }

  .daily-date {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 10px;
    font-weight: 500;
  }

  .daily-icon {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .daily-condition {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 10px;
    text-transform: capitalize;
  }

  .daily-temps {
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }

  .temp-high {
    color: var(--text);
    font-weight: 600;
  }

  .temp-low {
    color: var(--text-muted);
  }

  .daily-extra {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(148, 163, 184, 0.1);
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  @media (max-width: 1200px) {
    .weather-container {
      grid-template-columns: 1fr;
    }

    .current-weather {
      grid-column: 1;
    }

    .metrics-grid {
      grid-column: 1;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    .daily-forecast {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .header h1 {
      font-size: 1.8rem;
    }

    .temperature-display {
      font-size: 2.5rem;
    }

    .weather-icon-large {
      font-size: 3rem;
    }

    .search-input {
      width: 100%;
      max-width: 300px;
    }

    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .daily-forecast {
      grid-template-columns: repeat(2, 1fr);
    }

    .hourly-forecast {
      gap: 10px;
    }

    .hourly-card {
      min-width: 100px;
      font-size: 0.9rem;
    }
  }
`;

function WeatherApp() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const WEATHER_API = 'https://api.openweathermap.org/data/2.5';

  const getWeatherIcon = (description) => {
    const desc = description?.toLowerCase() || '';
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️';
    if (desc.includes('storm') || desc.includes('thunder')) return '⛈️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('fog') || desc.includes('mist')) return '🌫️';
    if (desc.includes('wind')) return '💨';
    return '🌤️';
  };

  const getWeatherClass = (description) => {
    const desc = description?.toLowerCase() || '';
    if (desc.includes('clear') || desc.includes('sunny')) return 'sunny';
    if (desc.includes('rain') || desc.includes('storm')) return 'rainy';
    if (desc.includes('cloud')) return 'cloudy';
    return 'cloudy';
  };

  const fetchWeather = async (searchCity) => {
    if (!searchCity.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!API_KEY) {
        throw new Error('API key not configured. Add VITE_WEATHER_API_KEY to .env.local');
      }

      // Fetch current weather
      const currentResponse = await fetch(
        `${WEATHER_API}/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      if (!currentResponse.ok) {
        throw new Error('City not found. Please try another search.');
      }
      const current = await currentResponse.json();

      // Fetch forecast
      const forecastResponse = await fetch(
        `${WEATHER_API}/forecast?lat=${current.coord.lat}&lon=${current.coord.lon}&appid=${API_KEY}&units=metric`
      );
      const forecast = await forecastResponse.json();

      setWeatherData(current);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(searchInputRef.current.value);
  };

  const groupForecastByDay = () => {
    if (!forecastData) return [];
    const grouped = {};
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return Object.entries(grouped).slice(0, 7);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="weather-app">
      <style>{STYLES}</style>

      <div className="header">
        <h1>🌤️ Weather Dashboard</h1>
        <p>Real-time weather information for any location worldwide</p>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          ref={searchInputRef}
          type="text"
          className="search-input"
          placeholder="Search for a city..."
          defaultValue={city}
          disabled={loading}
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message">⚠️ {error}</div>}

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>Fetching weather data...</span>
        </div>
      )}

      {!loading && weatherData && (
        <>
          <div className="weather-container">
            <div className={`current-weather ${getWeatherClass(weatherData.weather[0].main)}`}>
              <div className="weather-icon-large">
                {getWeatherIcon(weatherData.weather[0].main)}
              </div>
              <div className="temperature-display">
                {Math.round(weatherData.main.temp)}°C
              </div>
              <div className="weather-description">
                {weatherData.weather[0].description}
              </div>
              <div className="feels-like">
                Feels like {Math.round(weatherData.main.feels_like)}°C
              </div>
              <div className="location">
                📍 {weatherData.name}, {weatherData.sys.country}
              </div>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-label">💧 Humidity</div>
                <div className="metric-value">{weatherData.main.humidity}%</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">🌬️ Wind Speed</div>
                <div className="metric-value">{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">🔽 Pressure</div>
                <div className="metric-value">{weatherData.main.pressure} hPa</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">👁️ Visibility</div>
                <div className="metric-value">{(weatherData.visibility / 1000).toFixed(1)} km</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">☁️ Cloudiness</div>
                <div className="metric-value">{weatherData.clouds.all}%</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">🌅 Sunrise</div>
                <div className="metric-value">
                  {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          </div>

          {forecastData && (
            <>
              <div className="forecast-section">
                <div className="forecast-title">📊 24-Hour Forecast</div>
                <div className="hourly-forecast">
                  {forecastData.list.slice(0, 8).map((item, index) => (
                    <div key={index} className="hourly-card">
                      <div className="hourly-time">{formatTime(item.dt)}</div>
                      <div className="hourly-icon">{getWeatherIcon(item.weather[0].main)}</div>
                      <div className="hourly-temp">{Math.round(item.main.temp)}°C</div>
                      <div className="hourly-condition">{item.weather[0].main}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="forecast-section">
                <div className="forecast-title">📅 7-Day Forecast</div>
                <div className="daily-forecast">
                  {groupForecastByDay().map(([date, items], index) => {
                    const temps = items.map((item) => item.main.temp);
                    const maxTemp = Math.max(...temps);
                    const minTemp = Math.min(...temps);
                    const mainWeather = items[Math.floor(items.length / 2)];

                    return (
                      <div key={index} className="daily-card">
                        <div className="daily-date">{formatDate(date)}</div>
                        <div className="daily-icon">
                          {getWeatherIcon(mainWeather.weather[0].main)}
                        </div>
                        <div className="daily-condition">
                          {mainWeather.weather[0].main}
                        </div>
                        <div className="daily-temps">
                          <span className="temp-high">{Math.round(maxTemp)}°</span>
                          <span className="temp-low">{Math.round(minTemp)}°</span>
                        </div>
                        <div className="daily-extra">
                          💧 {Math.round(mainWeather.main.humidity)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default WeatherApp;
