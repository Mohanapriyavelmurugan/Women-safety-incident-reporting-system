const Case = require('../models/caseModel');

exports.addCaseUpdate = async (req, res) => {
  try {
    const result = await Case.addCaseUpdate(req.body);
    res.status(201).json({ message: 'Case update added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCaseUpdates = async (req, res) => {
  try {
    const updates = await Case.getCaseUpdates();
    res.status(200).json(updates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
