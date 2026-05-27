import { useState, useEffect, useRef } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080b0f;
    --surface: #0d1117;
    --surface2: #141c26;
    --surface3: #1a2536;
    --border: #1e2d40;
    --border2: #243347;
    --amber: #f0a500;
    --amber-dim: #7a5200;
    --green: #00e676;
    --green-dim: #004d26;
    --red: #ff3d57;
    --red-dim: #5c0011;
    --blue: #29b6f6;
    --blue-dim: #0a3a52;
    --text: #c9d8e8;
    --text-dim: #4a6278;
    --text-muted: #2a3d52;
    --white: #eaf2ff;
    --font-mono: 'Space Mono', monospace;
    --font-display: 'Bebas Neue', cursive;
    --font-body: 'DM Sans', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  .terminal {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse at 0% 0%, rgba(240,165,0,0.04) 0%, transparent 60%),
      radial-gradient(ellipse at 100% 100%, rgba(41,182,246,0.04) 0%, transparent 60%);
    padding: 0;
    overflow-x: hidden;
  }

  .header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .header-left { display: flex; align-items: center; gap: 16px; }
  .logo { font-family: var(--font-display); font-size: 28px; color: var(--amber); letter-spacing: 2px; line-height: 1; }
  .logo-sub { font-family: var(--font-mono); font-size: 9px; color: var(--text-dim); letter-spacing: 3px; text-transform: uppercase; }
  .header-badge {
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 4px;
    padding: 3px 8px;
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-dim);
    letter-spacing: 1px;
  }
  .header-badge.live { border-color: var(--green); color: var(--green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

  .header-right { display: flex; align-items: center; gap: 12px; }
  .clock { font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); }

  .scan-btn {
    background: var(--amber);
    color: #000;
    border: none;
    border-radius: 4px;
    padding: 8px 20px;
    font-family: var(--font-display);
    font-size: 16px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .scan-btn:hover:not(:disabled) { background: #ffc030; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(240,165,0,0.3); }
  .scan-btn:disabled { background: var(--amber-dim); color: #000; cursor: not-allowed; transform: none; }
  .scan-btn .spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(0,0,0,0.3);
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .main { padding: 20px 24px; max-width: 1400px; margin: 0 auto; }

  .price-hero {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px 28px;
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 32px;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .price-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
  }
  .price-hero.bullish::before { background: linear-gradient(90deg, transparent, var(--green), transparent); }
  .price-hero.bearish::before { background: linear-gradient(90deg, transparent, var(--red), transparent); }
  .price-hero.neutral::before { background: linear-gradient(90deg, transparent, var(--amber), transparent); }

  .price-label { font-family: var(--font-mono); font-size: 9px; color: var(--text-dim); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .price-value { font-family: var(--font-display); font-size: 52px; color: var(--white); letter-spacing: 1px; line-height: 1; }
  .price-change { display: flex; align-items: center; gap: 12px; margin-top: 6px; }
  .price-change-val { font-family: var(--font-mono); font-size: 14px; font-weight: 700; }
  .price-change-val.up { color: var(--green); }
  .price-change-val.down { color: var(--red); }

  .price-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .meta-label { font-family: var(--font-mono); font-size: 8px; color: var(--text-dim); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
  .meta-value { font-family: var(--font-mono); font-size: 13px; color: var(--text); }

  .signal-box {
    background: var(--surface2);
    border: 2px solid;
    border-radius: 8px;
    padding: 16px 24px;
    text-align: center;
    min-width: 160px;
  }
  .signal-box.long { border-color: var(--green); }
  .signal-box.short { border-color: var(--red); }
  .signal-box.wait { border-color: var(--amber); }
  .signal-label { font-family: var(--font-mono); font-size: 9px; color: var(--text-dim); letter-spacing: 2px; margin-bottom: 6px; }
  .signal-text { font-family: var(--font-display); font-size: 36px; letter-spacing: 3px; }
  .signal-text.long { color: var(--green); }
  .signal-text.short { color: var(--red); }
  .signal-text.wait { color: var(--amber); }
  .signal-conf { font-family: var(--font-mono); font-size: 10px; margin-top: 4px; }
  .signal-conf.long { color: var(--green); }
  .signal-conf.short { color: var(--red); }
  .signal-conf.wait { color: var(--amber); }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }

  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .card-header {
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-title { font-family: var(--font-display); font-size: 16px; color: var(--amber); letter-spacing: 2px; }
  .card-badge { font-family: var(--font-mono); font-size: 8px; color: var(--text-dim); letter-spacing: 1px; padding: 2px 6px; border: 1px solid var(--border2); border-radius: 3px; }
  .card-body { padding: 16px; }

  .reason-item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .reason-item:last-child { border-bottom: none; padding-bottom: 0; }
  .reason-num { font-family: var(--font-display); font-size: 28px; color: var(--text-muted); line-height: 1; min-width: 28px; }
  .reason-content { flex: 1; }
  .reason-title { font-size: 13px; font-weight: 600; color: var(--white); margin-bottom: 3px; }
  .reason-desc { font-size: 11px; color: var(--text-dim); line-height: 1.5; }
  .reason-impact { font-family: var(--font-mono); font-size: 9px; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-top: 4px; letter-spacing: 1px; }
  .reason-impact.bull { background: var(--green-dim); color: var(--green); }
  .reason-impact.bear { background: var(--red-dim); color: var(--red); }
  .reason-impact.neutral { background: var(--blue-dim); color: var(--blue); }

  .news-item { padding: 10px 0; border-bottom: 1px solid var(--border); }
  .news-item:last-child { border-bottom: none; }
  .news-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
  .news-title { font-size: 12px; font-weight: 600; color: var(--white); line-height: 1.4; }
  .news-dir { font-family: var(--font-mono); font-size: 9px; padding: 2px 6px; border-radius: 3px; white-space: nowrap; letter-spacing: 1px; }
  .news-dir.up { background: var(--green-dim); color: var(--green); }
  .news-dir.down { background: var(--red-dim); color: var(--red); }
  .news-dir.neutral { background: var(--blue-dim); color: var(--blue); }
  .news-desc { font-size: 11px; color: var(--text-dim); line-height: 1.5; }

  .tech-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .tech-item { background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 10px 12px; }
  .tech-label { font-family: var(--font-mono); font-size: 8px; color: var(--text-dim); letter-spacing: 2px; margin-bottom: 4px; }
  .tech-value { font-family: var(--font-mono); font-size: 13px; color: var(--text); }
  .tech-value.bull { color: var(--green); }
  .tech-value.bear { color: var(--red); }
  .tech-value.neutral { color: var(--amber); }
  .tech-sub { font-size: 10px; color: var(--text-dim); margin-top: 2px; }

  .bias-bar-wrap { margin: 14px 0 8px; }
  .bias-label-row { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 9px; margin-bottom: 6px; }
  .bias-bar { height: 8px; border-radius: 4px; background: linear-gradient(90deg, var(--red), #ff9800, var(--green)); position: relative; overflow: visible; }
  .bias-marker { position: absolute; top: -4px; width: 16px; height: 16px; background: var(--white); border-radius: 50%; transform: translateX(-50%); box-shadow: 0 0 8px rgba(255,255,255,0.5); transition: left 0.5s ease; }

  .summary-text { font-size: 13px; color: var(--text); line-height: 1.7; }

  .level-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border); }
  .level-row:last-child { border-bottom: none; }
  .level-name { font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); }
  .level-val { font-family: var(--font-mono); font-size: 12px; color: var(--text); }
  .level-val.resist { color: var(--red); }
  .level-val.support { color: var(--green); }

  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 20px; text-align: center; }
  .empty-icon { font-size: 64px; opacity: 0.2; }
  .empty-title { font-family: var(--font-display); font-size: 32px; color: var(--text-dim); letter-spacing: 3px; }
  .empty-desc { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); max-width: 400px; line-height: 1.8; letter-spacing: 1px; }

  .loading-overlay { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 16px; }
  .loading-ring { width: 60px; height: 60px; border: 3px solid var(--border2); border-top-color: var(--amber); border-radius: 50%; animation: spin 1s linear infinite; }
  .loading-msg { font-family: var(--font-mono); font-size: 11px; color: var(--amber); letter-spacing: 2px; animation: pulse 1.5s infinite; }
  .loading-steps { font-family: var(--font-mono); font-size: 9px; color: var(--text-dim); letter-spacing: 1px; }

  .error-box { background: rgba(255,61,87,0.08); border: 1px solid var(--red); border-radius: 6px; padding: 14px 18px; margin-bottom: 16px; font-family: var(--font-mono); font-size: 11px; color: var(--red); }

  .disclaimer { background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 10px 16px; margin-top: 16px; font-family: var(--font-mono); font-size: 9px; color: var(--text-muted); letter-spacing: 1px; line-height: 1.8; text-align: center; }

  .tag { display: inline-block; padding: 2px 7px; border-radius: 3px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 1px; }
  .tag-amber { background: rgba(240,165,0,0.15); color: var(--amber); border: 1px solid var(--amber-dim); }
  .tag-green { background: var(--green-dim); color: var(--green); }
  .tag-red { background: var(--red-dim); color: var(--red); }
  .tag-blue { background: var(--blue-dim); color: var(--blue); }

  .divider { border: none; border-top: 1px solid var(--border); margin: 12px 0; }
  .scantime { font-family: var(--font-mono); font-size: 9px; color: var(--text-dim); text-align: right; margin-top: 4px; letter-spacing: 1px; }

  @media (max-width: 900px) {
    .price-hero { grid-template-columns: 1fr; gap: 16px; }
    .price-meta { grid-template-columns: repeat(2, 1fr); }
    .grid-2 { grid-template-columns: 1fr; }
    .tech-grid { grid-template-columns: 1fr; }
  }
`;

const SYSTEM_PROMPT = `You are a professional NSE Nifty 50 options trader with 20 years of experience in index options (CE/PE), technical analysis, FII/DII flows, and macro analysis. Today is ${new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}. Current IST time: ${new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}.

Use web search to find the LATEST real-time Nifty 50 data. Return ONLY a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "price": { "last": "string", "change": "string", "changePct": "string", "high": "string", "low": "string", "open": "string", "volume": "string", "timestamp": "string", "status": "LIVE or CLOSED" },
  "marketBias": "BULLISH or BEARISH or NEUTRAL",
  "biasPct": 0-100,
  "signal": "LONG or SHORT or WAIT",
  "signalStrength": "HIGH CONVICTION or MODERATE or LOW",
  "signalReason": "one sentence",
  "reasons": [{ "title": "string", "desc": "string", "impact": "BULL or BEAR or NEUTRAL", "magnitude": "HIGH or MEDIUM or LOW" }],
  "news": [{ "headline": "string", "desc": "string", "direction": "UP or DOWN or NEUTRAL", "urgency": "BREAKING or TODAY or RECENT" }],
  "technicals": { "rsi": "string", "rsiSignal": "OVERBOUGHT or OVERSOLD or NEUTRAL", "macd": "string", "macdSignal": "BULL or BEAR", "trend": "string", "support1": "string", "support2": "string", "resistance1": "string", "resistance2": "string", "ema20": "string", "ema50": "string", "ema200": "string", "vix": "string", "pcr": "string", "pattern": "string" },
  "analysis": "3-4 sentence comprehensive analysis",
  "optionStrategy": "specific option strategy with strike"
}`;

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const ist = time.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return <span className="clock">IST {ist}</span>;
}

function ImpactBadge({ v }) {
  const map = { BULL: ['bull', '▲ BULLISH'], BEAR: ['bear', '▼ BEARISH'], NEUTRAL: ['neutral', '◆ NEUTRAL'], UP: ['up', '▲ BULLISH'], DOWN: ['down', '▼ BEARISH'] };
  const [cls, label] = map[v] || ['neutral', v];
  return <span className={`reason-impact ${cls}`}>{label}</span>;
}

function NewsDirBadge({ v }) {
  const map = { UP: ['up', '▲ BULLISH'], DOWN: ['down', '▼ BEARISH'], NEUTRAL: ['neutral', '◆ NEUTRAL'] };
  const [cls, label] = map[v] || ['neutral', v];
  return <span className={`news-dir ${cls}`}>{label}</span>;
}

function BiasBar({ pct }) {
  const pos = Math.max(2, Math.min(98, pct));
  return (
    <div className="bias-bar-wrap">
      <div className="bias-label-row">
        <span style={{color:'var(--red)'}}>◀ BEARISH</span>
        <span style={{color:'var(--amber)'}}>NEUTRAL</span>
        <span style={{color:'var(--green)'}}>BULLISH ▶</span>
      </div>
      <div className="bias-bar"><div className="bias-marker" style={{left:`${pos}%`}} /></div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanTime, setScanTime] = useState(null);
  const [loadMsg, setLoadMsg] = useState("SCANNING MARKETS...");
  const msgs = ["FETCHING LIVE NIFTY DATA...", "SCANNING GLOBAL CUES...", "RUNNING TECHNICAL ANALYSIS...", "ANALYSING FII/DII FLOWS...", "COMPUTING TRADE SIGNAL..."];
  const msgRef = useRef(null);

  const scan = async () => {
    setLoading(true); setError(null); setData(null);
    let i = 0; setLoadMsg(msgs[0]);
    msgRef.current = setInterval(() => { i = (i+1)%msgs.length; setLoadMsg(msgs[i]); }, 2800);
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error('VITE_ANTHROPIC_API_KEY not configured. Add it to your .env.local file.');
      }
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2500,
          system: SYSTEM_PROMPT,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{ role: "user", content: `Search for the latest Nifty 50 index data right now. Include current price, today's change, reasons for movement, breaking news, complete technical analysis. Current time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST. Return only JSON.` }]
        })
      });
      const raw = await resp.json();
      if (!resp.ok) throw new Error(raw.error?.message || "API error");
      const texts = (raw.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
      const clean = texts.replace(/```json|```/g,"").trim();
      const s = clean.indexOf("{"), e = clean.lastIndexOf("}");
      if (s===-1) throw new Error("Could not parse response. Please try again.");
      const parsed = JSON.parse(clean.slice(s,e+1));
      setData(parsed);
      setScanTime(new Date().toLocaleString('en-IN', { timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', day:'2-digit', month:'short' }));
    } catch(e) {
      setError(e.message);
    } finally {
      clearInterval(msgRef.current); setLoading(false);
    }
  };

  const signalClass = data ? data.signal?.toLowerCase() : "wait";
  const biasClass = data ? (data.marketBias==="BULLISH"?"bullish":data.marketBias==="BEARISH"?"bearish":"neutral") : "neutral";
  const chg = data ? parseFloat(data.price?.change||0) : 0;
  const chgClass = chg>0?"up":chg<0?"down":"";

  return (
    <div className="terminal">
      <style>{STYLES}</style>
      <div className="header">
        <div className="header-left">
          <div>
            <div className="logo">NIFTY PULSE</div>
            <div className="logo-sub">Options Trading Terminal</div>
          </div>
          <div className="header-badge">NSE · NIFTY 50</div>
          {data && <div className="header-badge live">● LIVE ANALYSIS</div>}
        </div>
        <div className="header-right">
          <Clock />
          <button className="scan-btn" onClick={scan} disabled={loading}>
            {loading ? <><div className="spinner"/>SCANNING</> : "⚡ SCAN MARKET"}
          </button>
        </div>
      </div>

      <div className="main">
        {error && <div className="error-box">⚠ ERROR: {error}</div>}

        {loading && (
          <div className="loading-overlay">
            <div className="loading-ring"/>
            <div className="loading-msg">{loadMsg}</div>
            <div className="loading-steps">POWERED BY CLAUDE AI · LIVE WEB SEARCH</div>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <div className="empty-title">MARKET SCANNER READY</div>
            <div className="empty-desc">PRESS ⚡ SCAN MARKET TO FETCH LIVE NIFTY 50 DATA,{"\n"}TECHNICAL ANALYSIS, NEWS IMPACT & TRADE SIGNAL.{"\n\n"}POWERED BY REAL-TIME WEB SEARCH + AI ANALYSIS.</div>
          </div>
        )}

        {!loading && data && (() => {
          const p = data.price||{};
          return (<>
            <div className={`price-hero ${biasClass}`}>
              <div>
                <div className="price-label">NIFTY 50 INDEX</div>
                <div className="price-value">{p.last||"—"}</div>
                <div className="price-change">
                  <span className={`price-change-val ${chgClass}`}>{chg>0?"▲":chg<0?"▼":"◆"} {p.change}</span>
                  <span className={`price-change-val ${chgClass}`}>({p.changePct}%)</span>
                  <span className="tag tag-amber">{p.status||"CLOSED"}</span>
                </div>
              </div>
              <div className="price-meta">
                <div><div className="meta-label">OPEN</div><div className="meta-value">{p.open}</div></div>
                <div><div className="meta-label">HIGH</div><div className="meta-value" style={{color:'var(--green)'}}>{p.high}</div></div>
                <div><div className="meta-label">LOW</div><div className="meta-value" style={{color:'var(--red)'}}>{p.low}</div></div>
                <div><div className="meta-label">VOLUME</div><div className="meta-value">{p.volume}</div></div>
                <div style={{gridColumn:'1/-1'}}><div className="meta-label">AS OF</div><div className="meta-value" style={{fontSize:'11px'}}>{p.timestamp}</div></div>
              </div>
              <div className={`signal-box ${signalClass}`}>
                <div className="signal-label">TRADE SIGNAL</div>
                <div className={`signal-text ${signalClass}`}>{data.signal}</div>
                <div className={`signal-conf ${signalClass}`}>{data.signalStrength}</div>
                <div style={{fontSize:'9px',color:'var(--text-dim)',marginTop:'6px',fontFamily:'var(--font-mono)',lineHeight:'1.4'}}>{data.signalReason}</div>
              </div>
            </div>

            <div className="grid-2">
              <div className="card">
                <div className="card-header"><span className="card-title">MARKET BIAS</span><span className="card-badge">{data.marketBias}</span></div>
                <div className="card-body">
                  <BiasBar pct={data.biasPct||50}/>
                  <div className="summary-text" style={{marginTop:'10px'}}>{data.analysis}</div>
                </div>
              </div>
              <div className="card">
                <div className="card-header"><span className="card-title">OPTION STRATEGY</span><span className="card-badge">RECOMMENDED</span></div>
                <div className="card-body">
                  <div style={{fontFamily:'var(--font-display)',fontSize:'14px',color:'var(--amber)',letterSpacing:'2px',marginBottom:'10px'}}>
                    {data.signal==="LONG"?"BUY CALL (CE)":data.signal==="SHORT"?"BUY PUT (PE)":"WAIT / HEDGE"}
                  </div>
                  <div className="summary-text">{data.optionStrategy}</div>
                  <hr className="divider"/>
                  <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                    <span className="tag tag-green">SUPPORT: {data.technicals?.support1}</span>
                    <span className="tag tag-red">RESIST: {data.technicals?.resistance1}</span>
                    <span className="tag tag-blue">VIX: {data.technicals?.vix}</span>
                    <span className="tag tag-amber">PCR: {data.technicals?.pcr}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-2">
              <div className="card">
                <div className="card-header"><span className="card-title">TOP 5 MOVEMENT REASONS</span><span className="card-badge">TODAY</span></div>
                <div className="card-body">
                  {(data.reasons||[]).slice(0,5).map((r,i)=>(
                    <div className="reason-item" key={i}>
                      <div className="reason-num">{String(i+1).padStart(2,'0')}</div>
                      <div className="reason-content">
                        <div className="reason-title">{r.title}</div>
                        <div className="reason-desc">{r.desc}</div>
                        <ImpactBadge v={r.impact}/>
                        {r.magnitude&&<span className="tag tag-amber" style={{marginLeft:'4px'}}>{r.magnitude}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-header"><span className="card-title">TOP 5 LIVE NEWS</span><span className="card-badge">REAL-TIME</span></div>
                <div className="card-body">
                  {(data.news||[]).slice(0,5).map((n,i)=>(
                    <div className="news-item" key={i}>
                      <div className="news-header">
                        <div className="news-title">{n.headline}</div>
                        <div style={{display:'flex',flexDirection:'column',gap:'4px',alignItems:'flex-end'}}>
                          <NewsDirBadge v={n.direction}/>
                          {n.urgency&&<span className="tag tag-amber">{n.urgency}</span>}
                        </div>
                      </div>
                      <div className="news-desc">{n.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={{marginBottom:'16px'}}>
              <div className="card-header"><span className="card-title">TECHNICAL ANALYSIS</span><span className="card-badge">MULTI-TIMEFRAME</span></div>
              <div className="card-body">
                <div className="tech-grid">
                  {[
                    {label:'RSI (14)', val:data.technicals?.rsi, cls:data.technicals?.rsiSignal==='OVERBOUGHT'?'bear':data.technicals?.rsiSignal==='OVERSOLD'?'bull':'neutral', sub:data.technicals?.rsiSignal},
                    {label:'MACD', val:data.technicals?.macd, cls:data.technicals?.macdSignal==='BULL'?'bull':'bear', sub:data.technicals?.macdSignal==='BULL'?'BULLISH CROSSOVER':'BEARISH CROSSOVER'},
                    {label:'TREND', val:data.technicals?.trend, cls:'neutral', sub:'PRICE ACTION'},
                    {label:'CANDLE PATTERN', val:data.technicals?.pattern, cls:'neutral', sub:'LATEST CANDLE'},
                    {label:'EMA 20', val:data.technicals?.ema20, cls:'', sub:'SHORT TERM'},
                    {label:'EMA 50', val:data.technicals?.ema50, cls:'', sub:'MID TERM'},
                    {label:'EMA 200', val:data.technicals?.ema200, cls:'', sub:'LONG TERM'},
                    {label:'INDIA VIX', val:data.technicals?.vix, cls:parseFloat(data.technicals?.vix||0)>18?'bear':'bull', sub:parseFloat(data.technicals?.vix||0)>18?'HIGH FEAR':'LOW FEAR'},
                  ].map((item,i)=>(
                    <div className="tech-item" key={i}>
                      <div className="tech-label">{item.label}</div>
                      <div className={`tech-value ${item.cls}`}>{item.val}</div>
                      <div className="tech-sub">{item.sub}</div>
                    </div>
                  ))}
                </div>
                <hr className="divider"/>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                  <div>
                    <div style={{fontFamily:'var(--font-mono)',fontSize:'9px',color:'var(--green)',letterSpacing:'2px',marginBottom:'8px'}}>▲ KEY SUPPORTS</div>
                    {[['S1',data.technicals?.support1],['S2',data.technicals?.support2]].map(([n,v])=>(
                      <div className="level-row" key={n}><span className="level-name">{n}</span><span className="level-val support">{v}</span></div>
                    ))}
                  </div>
                  <div>
                    <div style={{fontFamily:'var(--font-mono)',fontSize:'9px',color:'var(--red)',letterSpacing:'2px',marginBottom:'8px'}}>▼ KEY RESISTANCES</div>
                    {[['R1',data.technicals?.resistance1],['R2',data.technicals?.resistance2]].map(([n,v])=>(
                      <div className="level-row" key={n}><span className="level-name">{n}</span><span className="level-val resist">{v}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {scanTime && <div className="scantime">LAST SCANNED: {scanTime} IST</div>}
            <div className="disclaimer">⚠ DISCLAIMER: THIS TERMINAL IS FOR EDUCATIONAL PURPOSES ONLY. NOT SEBI-REGISTERED INVESTMENT ADVICE. OPTIONS TRADING INVOLVES SUBSTANTIAL RISK OF LOSS. VERIFY ALL DATA BEFORE TRADING. PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS. TRADE AT YOUR OWN RISK.</div>
          </>);
        })()}
      </div>
    </div>
  );
}
