const Police = require('../models/policeModel');

exports.addPolice = async (req, res) => {
  try {
    const result = await Police.addPolice(req.body);
    res.status(201).json({ message: 'Police officer added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPolice = async (req, res) => {
  try {
    const police = await Police.getAllPolice();
    res.status(200).json(police);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
