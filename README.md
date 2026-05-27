# NIFTY PULSE - Options Trading Terminal

A real-time Nifty 50 options trading analysis dashboard powered by Claude AI and live web search.

## Features

- 📊 **Live Nifty 50 Data** - Real-time price, volume, and market status
- 🤖 **AI-Powered Analysis** - Claude Sonnet 4 with web search capabilities
- 📈 **Technical Analysis** - RSI, MACD, EMA, Support/Resistance levels
- 🎯 **Trading Signals** - LONG/SHORT/WAIT with conviction levels
- 💡 **Options Strategy** - Recommended CE/PE strategies with strikes
- 📰 **Live News** - Real-time market moving news
- 📊 **Market Bias** - Bullish/Bearish/Neutral sentiment with visualization

## Tech Stack

- React 18
- Anthropic Claude AI API
- Web Search Integration
- Responsive CSS Grid Layout
- Vite

## Installation

```bash
npm install
npm run dev
```

## Environment Setup

Create a `.env.local` file:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

## Usage

1. Click **⚡ SCAN MARKET** to fetch live analysis
2. View real-time Nifty 50 price and sentiment
3. Review technical indicators and trading signals
4. Check recommended options strategy
5. Monitor live news and market movers

## Features Breakdown

### Price Hero Section
- Current Nifty 50 index price
- Daily change with percentage
- Open, High, Low, Volume
- Market status (LIVE/CLOSED)
- Trading signal with conviction

### Market Bias Card
- Bias percentage (Bearish → Neutral → Bullish)
- Animated bias marker
- Comprehensive AI analysis

### Technical Analysis Grid
- RSI (Overbought/Oversold detection)
- MACD (Bullish/Bearish crossovers)
- EMA 20/50/200 (Trend confirmation)
- India VIX (Fear gauge)
- Support & Resistance levels
- Candle patterns

### Options Strategy
- BUY CALL (CE) for LONG signals
- BUY PUT (PE) for SHORT signals
- Strike recommendations
- Risk/Reward parameters

### News & Reasons
- Top 5 movement reasons with impact
- Live news with urgency tags
- Direction indicators (UP/DOWN/NEUTRAL)

## Color Scheme

- **Amber** (#f0a500) - Primary, Neutral
- **Green** (#00e676) - Bullish, Support
- **Red** (#ff3d57) - Bearish, Resistance
- **Blue** (#29b6f6) - Info, VIX

## API Integration

The app uses Anthropic Claude API with web search tool:
- Model: claude-sonnet-4-20250514
- Tool: web_search_20250305
- Max tokens: 2500

## Responsive Design

- Desktop: Full 2-column grid layout
- Tablet (≤900px): Single column layout
- Mobile optimized typography and spacing

## Disclaimer

⚠️ **For Educational Purposes Only**
- Not SEBI-registered investment advice
- Options trading involves substantial risk of loss
- Verify all data before trading
- Past performance does not guarantee future results
- Trade at your own risk

## License

MIT