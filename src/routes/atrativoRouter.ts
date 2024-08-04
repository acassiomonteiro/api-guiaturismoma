import express from "express";
import AtrativoController from "../controllers/AtrativoRoutes";

const router = express.Router();

const atrativoController = new AtrativoController();

router.get("/", (req, res) => atrativoController.getAllAtrativos(req, res));
router.get("/:id", (req, res) => atrativoController.getAtrativosById(req, res));
router.post("/", (req, res) => atrativoController.createAtrativo(req, res));
router.put("/:id", (req, res) => atrativoController.updateAtrativo(req, res));
router.delete("/:id", (req, res) => atrativoController.deleteAtrativo(req, res));

export default router;
