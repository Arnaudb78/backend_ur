import { Request, Response } from "express";
import Guide from "../models/guideModel";

const createGuide = async (req: Request, res: Response) => {
    console.log("Guide", req.body);
    if(!req.body) return res.status(400).send({ message: "Guide cannot be empty" });
    const { title, description} = req.body;
    try {
        const guide = new Guide({ 
            title,
            description,
        });
        
        await guide.save();
        return res.status(201).send(guide);
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
}

const getAllGuides = async (req: Request, res: Response) => {
    try {
        const guides = await Guide.find();
        return res.status(200).send(guides);
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
}

export { createGuide, getAllGuides };