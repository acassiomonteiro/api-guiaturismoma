import { Request, Response } from "express";
import * as itemModel from "../models/item";

export const getAllItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  const items = await itemModel.getAllItems();
  res.json(items);
};

export const getItemById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const item = await itemModel.getItemById(Number(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
};

export const createItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newItem = await itemModel.createItem(req.body);
  res.status(201).json(newItem);
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updatedItem = await itemModel.updateItem(
    Number(req.params.id),
    req.body
  );
  res.json(updatedItem);
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  await itemModel.deleteItem(Number(req.params.id));
  res.status(204).send();
};
