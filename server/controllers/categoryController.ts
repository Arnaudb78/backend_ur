import { Request, Response } from "express";
import Category from "../models/categoryModel";

const create = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Category cannot be empty" });

    const { name, description, token } = req.body;
};
