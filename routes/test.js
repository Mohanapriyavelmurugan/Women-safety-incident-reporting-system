// backend/index.js or routes/test.js
app.get("/api/ping", (req, res) => {
    res.status(200).json({ message: "pong from backend" });
  });
  