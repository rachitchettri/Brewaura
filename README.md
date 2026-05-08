# Brewaura

Brewaura is a MERN stack moka pot coffee recipe app with an interactive Framer Motion brewing simulator.

## Features

- Express + MongoDB recipe CRUD API
- Mongoose recipe model with animation stages
- Seed data for 1-cup, 3-cup, and 6-cup moka recipes
- Vite React frontend with React Router and Axios
- Coffee-themed responsive Tailwind UI
- Step-controlled brewing simulator with autoplay, progress, steam, boiling water, coffee flow, and serve animations
- Web Audio API stage cues with a gentle heating ambience for the simulator
- SpeechSynthesis read-aloud support for recipe instructions and active animation stages
- Animated barista illustration that guides users through recipe and simulation screens
- Local browser favorites

## Getting Started

```bash
npm run install:all
cp server/.env.example server/.env
npm run seed
npm run dev
```

The client runs at `http://localhost:5173` and the API runs at `http://localhost:5000` by default.

## API Routes

- `GET /api/recipes`
- `GET /api/recipes/:id`
- `POST /api/recipes`
- `PUT /api/recipes/:id`
- `DELETE /api/recipes/:id`
