const db = require('./db');

exports.createUser = async (user) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
    [user.name, user.email, user.phone, user.password, user.role || 'victim']
  );
  return result;
};

exports.getUsers = async () => {
  const [rows] = await db.execute('SELECT * FROM users');
  return rows;
};
