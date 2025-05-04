const Incident = require('../models/incidentModel');

exports.reportIncident = async (req, res) => {
  try {
    const result = await Incident.reportIncident(req.body);
    res.status(201).json({ message: 'Incident reported', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.getIncidents();
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
