import { Request, Response } from "express";
import Category from "../models/categoryModel";

const createCategory = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Category cannot be empty" });
    const { name, description, accessToken, admin } = req.body;
    if (!admin || admin !== true) return res.status(401).send({ message: "Unauthorized" });
    if (!accessToken) return res.status(401).send({ message: "no token detected" });

    const category = new Category({ name, description });

    try {
        await category.save();
        return res.status(201).send(category);
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
};

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        return res.status(200).send(categories);
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
};

export { createCategory, getAllCategories };
