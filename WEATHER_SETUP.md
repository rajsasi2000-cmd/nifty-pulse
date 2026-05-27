# Weather Dashboard Setup Guide

## Quick Start (5 minutes)

### 1. Get Free OpenWeatherMap API Key

1. Visit: **https://openweathermap.org/api**
2. Click **"Sign Up"**
3. Fill in details and verify email
4. Go to **API Keys** section
5. Copy your **API Key**

**Free tier includes:**
- ✅ Current weather data
- ✅ 5-day/3-hour forecast
- ✅ 60 calls/minute
- ✅ 1,000,000 calls/month

### 2. Add API Key to Project

In your project folder, open/create `.env.local`:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key from OpenWeatherMap.

### 3. Install & Run

```bash
npm install
npm run dev
```

Visit **http://localhost:3000** and switch to Weather Dashboard tab

---

## Features Overview

### 🌡️ Current Weather
- Real-time temperature
- "Feels like" temperature
- Weather description
- Location with country code

### 📊 Detailed Metrics
- **Humidity**: Percentage moisture in air
- **Wind Speed**: Current wind velocity (km/h)
- **Pressure**: Atmospheric pressure (hPa)
- **Visibility**: Distance you can see (km)
- **Cloud Coverage**: Percentage of sky covered
- **Sunrise/Sunset**: Times for your location

### 📈 24-Hour Forecast
- 8 time slots (3-hour intervals)
- Temperature for each period
- Weather icons and descriptions
- Click any card for details

### 📅 7-Day Forecast
- Daily high/low temperatures
- Weather conditions
- Humidity percentage
- Trend visualization

---

## Usage

1. **Enter a city name** in the search box
2. **Press Enter** or click Search button
3. **View real-time data** for that location
4. **Check forecasts** for planning

---

## API Reference

### Current Weather Endpoint
```
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

### Forecast Endpoint
```
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric
```

### Parameters
- `units=metric` → Celsius (°C)
- `units=imperial` → Fahrenheit (°F)

---

## Customization

### Change Default City
In `src/WeatherApp.jsx`, line 225:
```javascript
const [city, setCity] = useState('London');  // Change to your city
```

### Change Temperature Unit
In `src/WeatherApp.jsx`, find all `&units=metric` and change to:
- `units=imperial` for Fahrenheit
- Update display format accordingly

### Add More Metrics
Add new metric cards in the `metrics-grid` section:
```jsx
<div className="metric-card">
  <div className="metric-label">📌 Your Metric</div>
  <div className="metric-value">{weatherData.your_field}</div>
</div>
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API key error | Verify `.env.local` has correct key |
| City not found | Check spelling, try full city name |
| Blank page | Ensure API key is configured |
| No data showing | Wait 5 seconds for API response |
| Wrong temperature | Confirm units are set to `metric` |

---

## Performance Tips

- Weather data cached for 10 minutes
- Search is debounced to prevent excessive API calls
- Lazy loading for hourly forecasts
- Optimized re-renders with React hooks

---

## Limitations (Free Tier)

- ✅ Current weather (unlimited)
- ✅ 5-day forecast (unlimited)
- ⚠️ Historical data (limited to 5 days)
- ⚠️ Air pollution data (premium only)
- ⚠️ Satellite imagery (premium only)

For more features, upgrade to **Professional** or **Enterprise** plan.

---

## Support

- **OpenWeatherMap Docs**: https://openweathermap.org/api
- **API Status**: https://openweathermap.org/api/status
- **Rate Limits**: 60 calls/minute, 1M/month (free)

---

## Next Steps

1. ✅ Deploy the app to Vercel/Netlify
2. ✅ Add more cities to favorites
3. ✅ Add weather alerts/notifications
4. ✅ Create weather history chart
5. ✅ Add geolocation support

---

Enjoy using the Weather Dashboard! 🌤️
