import { Express } from "express";
import DestinoRouter from "./destinoRouter";
import AtrativoRouter from "./atrativoRouter";

const router = (app: Express) => {
  app.use("/destino", DestinoRouter);
  app.use("/atrativo", AtrativoRouter);
};

export default router;
