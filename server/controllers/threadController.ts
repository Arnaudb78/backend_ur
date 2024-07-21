import { Request, Response } from "express";
import Thread from "../models/threadModel";
import userModel from "../models/userModel";
import categoryModel from "../models/categoryModel";

const createThread = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Thread cannot be empty" });
    const { accessToken, title, content, category } = req.body;
    if (!accessToken) return res.status(401).send({ message: "No token detected" });

    try {
        const user = await userModel.findOne({ accessToken: accessToken });
        if (!user) return res.status(404).send({ message: "User not found" });
        if (user.role !== "admin") return res.status(401).send({ message: "Unauthorized" });
        const findCategory = await categoryModel.findOne({ name: category});
        if (!findCategory) return res.status(404).send({ message: "Category not found" });
        const categoryId = findCategory._id;
        const author = user.firstname + " " + user.lastname;

        const thread = new Thread({ 
            title,
            content,
            category: categoryId,
            author: author,
        });
        
        await thread.save();
        return res.status(201).send(thread);
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
};

const getAllThreadByCategory = async (req: Request, res: Response) => {
    if (!req.query.category) return res.status(400).send({ message: "Category cannot be empty" });
    const { category } = req.query;

    try {
        const threads = await Thread.find({ category: category });
        return res.status(200).send(threads);
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
}

export { createThread, getAllThreadByCategory };
