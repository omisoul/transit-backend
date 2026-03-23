const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

const vehicles = require("./data/vehicles");
const busSimulation = require("./services/simulation");

let simStart = busSimulation();
let isRunning = true;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ test: "test" });
});

app.post("/simulation/stop", (req, res) => {
  if (!isRunning) {
    res.json({ message: "Already stopped" });
    return;
  }
  clearInterval(simStart);
  isRunning = false;
  simStart = null;
  console.log("Similuation Stopped");
  res.json({ message: "Successfully stopped", isRunning });
});

app.post("/simulation/start", (req, res) => {
  if (isRunning) {
    res.json({ message: "Already running", isRunning });
    return;
  }
  simStart = busSimulation();
  isRunning = true;
  console.log("Simulation Started");

  res.json({ message: "Successfully started", isRunning });
});

app.post("/simulation/reset", (req, res) => {
  for (const vehicle of vehicles) {
    vehicle.lat = vehicle.startLat;
    vehicle.lng = vehicle.startLng;
    vehicle.routeIndex = 1;
    vehicle.direction = 1;
    vehicle.lastUpdated = Date.now();
  }
  res.json({ message: "Successfully Reset", isRunning });
});

app.get("/simulation/status", (req, res) => {
  res.json({ isRunning });
});

const vehicleRouter = require("./routes/vehicles");

app.use("/vehicles", vehicleRouter);

app.listen(port, () => {
  console.log("Server is running");
});
