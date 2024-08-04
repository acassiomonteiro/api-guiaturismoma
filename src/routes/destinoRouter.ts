import express from "express";
import DestinoController from "../controllers/DestinoController";

const router = express.Router();
const destinoController = new DestinoController();

router.get("/", (req, res) => destinoController.getAllDestinos(req, res));
router.get("/:id", (req, res) => destinoController.getDestinosById(req, res));
router.post("/", (req, res) => destinoController.createDestino(req, res));
router.put("/:id", (req, res) => destinoController.updateDestino(req, res));
router.delete("/:id", (req, res) => destinoController.deleteDestino(req, res));

export default router;
