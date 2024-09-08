import { Request, Response } from "express";
import Address from "../models/addressModel";

const findAddressById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: "Address ID is required" });

    const address = await Address.findById(id);
    if (!address) return res.status(404).send({ message: "Address not found" });

    return res.status(200).send(address);
}

export { findAddressById };