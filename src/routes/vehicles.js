// Made this route to learn the basics of Routers in Express
const express = require("express");

const router = express.Router();

const vehicles = require("../data/vehicles");

router.get("/", (req, res) => {
  res.json(vehicles);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  let vehicleRes = {};
  for (const vehicle of vehicles) {
    if (vehicle.id === parseInt(id)) {
      vehicleRes = vehicle;
    }
  }
  res.json(vehicleRes);
});

module.exports = router;
