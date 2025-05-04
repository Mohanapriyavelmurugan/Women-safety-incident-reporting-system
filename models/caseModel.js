const db = require('./db');

exports.addCaseUpdate = async (update) => {
  const [result] = await db.execute(
    'INSERT INTO case_tracking (incident_id, police_id, update_note, status) VALUES (?, ?, ?, ?)',
    [update.incident_id, update.police_id, update.update_note, update.status]
  );
  return result;
};

exports.getCaseUpdates = async () => {
  const [rows] = await db.execute(
    `SELECT ct.*, i.description AS incident_desc, p.name AS police_name
     FROM case_tracking ct
     JOIN incidents i ON i.id = ct.incident_id
     JOIN police p ON p.id = ct.police_id
     ORDER BY ct.update_time DESC`
  );
  return rows;
};
