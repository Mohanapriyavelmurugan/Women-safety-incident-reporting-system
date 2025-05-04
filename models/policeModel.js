const db = require('./db');

exports.addPolice = async (officer) => {
  const [result] = await db.execute(
    'INSERT INTO police (name, badge_id, station, phone, email) VALUES (?, ?, ?, ?, ?)',
    [officer.name, officer.badge_id, officer.station, officer.phone, officer.email]
  );
  return result;
};

exports.getAllPolice = async () => {
  const [rows] = await db.execute('SELECT * FROM police');
  return rows;
};
