import express from "express";
import cors from "cors";

const PORT = 3001;
const app = express();
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
