import { Request, Response } from "express";
import prisma from "../lib/prisma";

export default class DestinoController {
  async getAllDestinos(req: Request, res: Response) {
    try {
      const destinos = await prisma.destino.findMany();
      res.json(destinos);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getDestinosById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const destino = await prisma.destino.findUnique({
        where: { id: Number(id) },
      });
      if (destino) {
        res.json(destino);
      } else {
        res.status(404).json({ error: "Destino not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createDestino(req: Request, res: Response) {
    const { name, description, localizacao, imagem, imagem2, imagem3, imagem4 } = req.body;
    try {
      const destino = await prisma.destino.create({
        data: { name, description, localizacao, imagem, imagem2, imagem3, imagem4 },
      });
      res.status(201).json(destino);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateDestino(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, localizacao, imagem, imagem2, imagem3, imagem4 } = req.body;
    try {
      const destino = await prisma.destino.update({
        where: { id: Number(id) },
        data: { name, description, localizacao, imagem, imagem2, imagem3, imagem4 },
      });
      res.json(destino);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteDestino(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.destino.delete({ where: { id: Number(id) } });
      res.json({ message: "Destino deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
