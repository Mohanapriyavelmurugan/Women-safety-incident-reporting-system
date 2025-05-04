const db = require('./db');

exports.addContact = async (contact) => {
  const [result] = await db.execute(
    'INSERT INTO emergency_contacts (user_id, name, phone, relation) VALUES (?, ?, ?, ?)',
    [contact.user_id, contact.name, contact.phone, contact.relation]
  );
  return result;
};

exports.getContactsByUser = async (userId) => {
  const [rows] = await db.execute(
    'SELECT * FROM emergency_contacts WHERE user_id = ?',
    [userId]
  );
  return rows;
};
