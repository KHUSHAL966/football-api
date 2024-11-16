const express = require("express");
const router = express.Router();
const Football = require("../models/Football");

// Add a new football team
router.post("/add", async (req, res) => {
  try {
    const newTeam = new Football(req.body);
    await newTeam.save();
    res.status(201).json({ message: "Team added successfully!", team: newTeam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all football teams
router.get("/all", async (req, res) => {
  try {
    const teams = await Football.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a team's data
router.put("/update/:id", async (req, res) => {
  try {
    const updatedTeam = await Football.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Team updated successfully!", team: updatedTeam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a team's data
router.delete("/delete/:id", async (req, res) => {
  try {
    await Football.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Team deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
