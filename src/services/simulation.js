const vehicles = require("../data/vehicles");

function busSimulation() {
  return setInterval(() => {
    for (const bus of vehicles) {
      // Flips direction at bounds
      if (bus.routeIndex >= bus.route.length - 1) {
        bus.direction = -1;
      }

      if (bus.routeIndex <= 0) {
        bus.direction = 1;
      }

      moveBus(bus);
      bus.lastUpdated = Date.now();
    }
  }, 1000);
}

// Current implementation only deals with UI smoothing, doesn't taking into consideration speed
function moveBus(vehicle) {
  let target = vehicle.route[vehicle.routeIndex];
  const step = 1;

  vehicle.lat += (target[0] - vehicle.lat) * step;
  vehicle.lng += (target[1] - vehicle.lng) * step;

  const reachedTarget =
    Math.abs(vehicle.lat - target[0]) < 0.00001 &&
    Math.abs(vehicle.lng - target[1]) < 0.00001;

  if (reachedTarget) {
    vehicle.routeIndex += vehicle.direction;
    console.log("Route Index Updated", vehicle.routeIndex);
  }
}

module.exports = busSimulation;
