const db = require('./db');

exports.reportIncident = async (incident) => {
  const [result] = await db.execute(
    'INSERT INTO incidents (user_id, location, description) VALUES (?, ?, ?)',
    [incident.user_id, incident.location, incident.description]
  );
  return result;
};

exports.getIncidents = async () => {
  const [rows] = await db.execute('SELECT * FROM incidents');
  return rows;
};
