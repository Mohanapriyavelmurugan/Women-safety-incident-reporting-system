const Contact = require('../models/contactModel');

exports.addEmergencyContact = async (req, res) => {
  try {
    const result = await Contact.addContact(req.body);
    res.status(201).json({ message: 'Emergency contact added', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserContacts = async (req, res) => {
  try {
    const contacts = await Contact.getContactsByUser(req.params.userId);
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
