import { Request, Response } from "express";
import Guide from "../models/guideModel";

const createGuide = async (req: Request, res: Response) => {
    console.log("Guide", req.body);
    if (!req.body) return res.status(400).send({ message: "Guide cannot be empty" });
    const { title, description, subtitle1, content1, img1, subtitle2, content2, img2, subtitle3, content3, img3} = req.body;
    try {
        const guide = new Guide({
            title,
            description,
            subtitle1,
            content1,
            img1,
            subtitle2,
            content2,
            img2,
            subtitle3,
            content3,
            img3,
        });

        await guide.save();
        return res.status(201).send(guide);
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
};

const getAllGuides = async (req: Request, res: Response) => {
    try {
        const guides = await Guide.find();
        return res.status(200).send(guides);
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
};

const getGuideById = async (req: Request, res: Response) => {
    try {
        const guide = await Guide.findById(req.params.id);
        if (!guide) return res.status(404).send({ message: "Guide not found" });
        return res.status(200).send(guide);
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
};

export { createGuide, getAllGuides, getGuideById };
