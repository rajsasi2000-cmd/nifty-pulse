# Weather Dashboard

A beautiful, real-time weather dashboard that fetches data from OpenWeatherMap API with current conditions, hourly forecast, and 7-day forecast.

## Features

- 🌍 **Real-time Weather Data** - Live temperature, humidity, wind speed
- 📍 **Location Search** - Search weather for any city worldwide
- 🌡️ **Current Conditions** - Temperature, "feels like", weather description
- 📊 **Detailed Metrics** - Humidity, pressure, wind speed, UV index, visibility
- 📈 **Hourly Forecast** - 24-hour weather predictions
- 📅 **7-Day Forecast** - Weekly weather trends
- 🌙 **Day/Night Indicators** - Sunrise/sunset times
- 🎨 **Dynamic Styling** - UI changes based on weather conditions
- 📱 **Fully Responsive** - Works on desktop, tablet, mobile

## Tech Stack

- React 18
- Vite
- OpenWeatherMap API (Free tier available)
- CSS Grid & Flexbox
- Chart.js for temperature trends

## Installation

```bash
npm install
npm run dev
```

## Setup - Get Free API Key

1. Visit: **https://openweathermap.org/api**
2. Sign up for free account
3. Go to API Keys section
4. Copy your key (Free tier includes current weather + forecast)
5. Create `.env.local` file:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

## Usage

1. Enter any city name in the search box
2. Press Enter or click Search
3. View current weather and forecasts
4. Click on any forecast card to see detailed hourly breakdown

## API Integration

- **Endpoint**: OpenWeatherMap Current Weather + Forecast APIs
- **Free Tier**: 60 calls/minute, 1,000,000 calls/month
- **Data Refresh**: Every 10 minutes for live updates

## Features Breakdown

### Current Weather Section
- Large temperature display
- Weather icon animation
- "Feels like" temperature
- Weather description
- Location name

### Detailed Metrics Grid
- Real-feel temperature
- Humidity percentage with gauge
- Atmospheric pressure
- Wind speed & direction
- UV index
- Visibility distance
- Sunrise & sunset times
- Cloud coverage

### Hourly Forecast
- Next 24 hours with 3-hour intervals
- Temperature progression
- Precipitation probability
- Wind speed changes

### 7-Day Forecast
- Daily high/low temperatures
- Weather conditions with icons
- Precipitation chance
- Weather trend chart

## Weather Icons

Dynamic icons based on conditions:
- ☀️ Clear sky
- ⛅ Partly cloudy
- ☁️ Cloudy
- 🌧️ Rainy
- ⛈️ Thunderstorm
- ❄️ Snowy
- 🌫️ Foggy

## Color Scheme

- **Sunny**: Warm orange/yellow
- **Rainy**: Cool blue/gray
- **Cloudy**: Neutral gray
- **Snowy**: Light blue/white
- **Storm**: Dark purple/gray

## Responsive Breakpoints

- Desktop (>1200px): Full layout
- Tablet (768px-1200px): 2-column grid
- Mobile (<768px): Single column stack

## Performance

- Weather data cached for 10 minutes
- Lazy loading for hourly forecast
- Optimized re-renders
- Debounced search input

## Disclaimer

Weather data provided by OpenWeatherMap. Accuracy depends on data source quality.

## License

MIT
