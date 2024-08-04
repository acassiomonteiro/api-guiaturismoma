import { Request, Response } from "express";
import prisma from "../lib/prisma";

export default class AtrativoController {
  async getAllAtrativos(req: Request, res: Response) {
    const atrativos = await prisma.atrativo.findMany();
    return res.json(atrativos);
  }

  async getAtrativosById(req: Request, res: Response) {
    const { id } = req.params;
    const atrativo = await prisma.atrativo.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.json(atrativo);
  }

  async createAtrativo(req: Request, res: Response) {
    const { name, tipo, description, dicas, destino_id } = req.body;
    const atrativo = await prisma.atrativo.create({
      data: {
        name,
        tipo,
        description,
        dicas,
        destino_id,
      },
    });
    return res.json(atrativo);
  }

  async updateAtrativo(req: Request, res: Response) {
    const { id } = req.params;
    const { name, tipo, description, dicas, destino_id } = req.body;
    const atrativo = await prisma.atrativo.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        tipo,
        description,
        dicas,
        destino_id,
      },
    });
    return res.json(atrativo);
  }

  async deleteAtrativo(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.atrativo.delete({
      where: {
        id: Number(id),
      },
    });
    return res.json({ message: "Atrativo deletado com sucesso!" });
  }
}
