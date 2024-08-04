import express from "express";
import cors from "cors";
import itemRouter from "./routes/itemRouter";

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", itemRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});
