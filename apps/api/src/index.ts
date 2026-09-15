import { db } from "@orthedo/database";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    const x = await db.$queryRaw`SELECT 1`;
    
    res.json({ status: "ok", x });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

export default app;
