import express from "express";
import router from "./routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Programa trilhas!");
});

router(app);

export default app;
