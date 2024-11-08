import express from "express";

const PORT = 3001;
const app = express();

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
