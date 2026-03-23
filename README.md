# Bus Simulation API

A simple Express.js backend that simulates real-time bus movement along predefined routes. Built to support a frontend map-based UI (e.g. Leaflet) with live vehicle updates.

---

## Overview

This project simulates buses moving along real-world routes using a timed interval. Each vehicle updates its position every second, allowing a frontend to visualize movement in near real-time.

### Features

- Live vehicle position updates
- Simulation controls (start, stop, reset)
- Route-based movement logic
- REST API for vehicle data

---

## How It Works

- Vehicles follow a predefined route (array of coordinates)
- A simulation loop runs every second using `setInterval`
- Each tick:
  - Vehicles move toward the next coordinate
  - Direction reverses at route ends
  - Position updates are stored in memory

---

## Tech Stack

- Node.js
- Express.js
- CORS

---

## Project Structure

```
├── server.js          # Main server + simulation controls
├── services/
│   └── simulation.js  # Simulation engine
├── routes/
│   └── vehicles.js    # Vehicle API routes
└── data/
    └── vehicles.js    # Vehicle + route data
```

---

## Getting Started

### 1. Install dependencies

npm install

### 2. Run the server

Server runs on: http://localhost:4000

## API Endpoints

### Simulation Controls

POST /simulation/start
Starts the simulation (if not already running)

POST /simulation/stop
Stops the simulation

POST /simulation/reset
Resets all vehicles to their starting positions

GET /simulation/status
Returns simulation state

Response: { "isRunning": true }

### Vehicles

GET /vehicles
Returns all vehicles with current positions

GET /vehicles/:id
Returns a single vehicle by ID

### Vehicle Data Structure

{
"id": 1,
"name": "Bus A",
"lat": 18.012441,
"lng": -76.799093,
"route": [...],
"routeIndex": 1,
"direction": 1,
"speed": 50,
"status": "on_route",
"lastUpdated": 1710000000000
}

## Simulation Behavior

- Vehicles move along a route using interpolation
- When a vehicle reaches the end:
- Direction flips
- It travels back along the route
- Updates happen every 1 second

Note: Current movement is optimized for UI smoothness and does not strictly simulate real-world speed.

## Notes

- Data is stored in-memory (no database)
- Simulation resets on server restart
- Designed for learning and prototyping real-time systems
