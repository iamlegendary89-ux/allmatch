# SmartMatch Pro

A 5-question quiz web app to recommend the top 3 smartphones based on user preferences, with a scraper for daily phone updates and weekly reviews from top 20 sites.

## Structure
- `index.html`: Quiz UI
- `style.css`: Styling with animations
- `script.js`: Quiz logic, recommendation engine
- `update-phones.js`: Scraper
- `schedule-updates.js`: Local cron
- `vercel.json`: Vercel config
- `package.json`: Dependencies
- `phones.json`: Output data
- `manifest.json`: PWA manifest
- `README.md`: Guide

## Features
- **Quiz**: 5 questions, cosine similarity for top 3 matches (center = best).
- **Animations**: Fade-ins, progress bar, result scaling, random backgrounds.
- **Data**: Top 20 phones (2023-2025), percentages for specs.
- **Scraper**: Daily phone additions, weekly review updates (PhoneArena + GSMArena fallback).
- **Sources**: TechRadar, CNET, PCMag, etc. + Reddit.
- **Scoring**: 1-100% (battery: mAh/50, camera: MP/0.5, etc.).

## Setup
1. `npm install`
2. Run: `npm start`
3. Local cron: `npm run schedule`
4. Deploy to Vercel:
   - Push to GitHub
   - Import to Vercel
   - Deploy (auto-handles cron, static files)

## Quiz Integration
In `script.js`:
```javascript
fetch('/triggerUpdate').then(() => fetch('phones.json').then(r => r.json()));
```

## Deployment
- **Vercel (Recommended)**: Free, Git push, auto-cron via `vercel.json`.
- **Local/VPS**: Use `schedule-updates.js` for cron.

## Notes
- Vanilla JS + CSS for speed (~50ms load).
- ~10KB runtime, no frameworks.
- Respect site TOS; proxies for production scraping.

## License
MIT