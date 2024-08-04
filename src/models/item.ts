import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Item {
  id: number;
  name: string;
  description: string;
}

export const getAllItems = async (): Promise<Item[]> => {
  return await prisma.item.findMany();
};

export const getItemById = async (id: number): Promise<Item | null> => {
  return await prisma.item.findUnique({ where: { id } });
};

export const createItem = async (item: Item): Promise<Item> => {
  return await prisma.item.create({ data: item });
};

export const updateItem = async (id: number, item: Item): Promise<Item> => {
  return await prisma.item.update({ where: { id }, data: item });
};

export const deleteItem = async (id: number): Promise<void> => {
  await prisma.item.delete({ where: { id } });
};
