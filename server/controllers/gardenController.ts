import { Request, Response } from "express";
import Address from "../models/addressModel";
import Garden from "../models/gardenModel";
import User from "../models/userModel";


const register = async (req: Request, res: Response) => {
    if(!req.body) return res.status(400).send({ message: "Address cannot be empty" });
    const { accessToken, street, complementary, postCode, city, country, name, description, capacity } = req.body;
    
    if(!accessToken) return res.status(401).send({ message: "Access token is required" });
    const userId = await User.findOne({ accessToken : accessToken });
    if(!userId) return res.status(404).send({ message: "User not found" });
    
    // verify address is not already in DB
    const addressExist = await Address.findOne({ street: street, postCode: postCode });
    if(addressExist) return res.status(400).send({ message: "Address already exists" });
    
    // verify garden is not already in DB
    const gardenExist = await Garden.findOne({ name: name });
    if(gardenExist) return res.status(400).send({ message: "Garden already exists" });

    // get lat + lon with API Geo
    const transformStreet = transformAddress(street);
    const coords = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${transformStreet}&postcode=${postCode}`);

    const data = await coords.json();
    if(data.features.length === 0) return res.status(400).send({ message: "Address not found" });
    const lat = data.features[0].geometry.coordinates[1];
    const lon = data.features[0].geometry.coordinates[0];

    try {
        const addressData = new Address({
            street,
            complementary,
            postCode,
            city,
            country,
            lat,
            lon
        });

        const address = await addressData.save();
        const address_id = address._id;

        const gardenData = new Garden({
            name,
            description,
            address: address_id,
            owner: userId,
            capacity
        });

        const garden = await gardenData.save();
        res.status(201).send({ message: "Garden created", garden });

    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

const findGardenByUser = async (req: Request, res: Response) => {
    const { accessToken } = req.params;
    if(!req.params) return res.status(400).send({ message: "Address cannot be empty" });
    
    if(!accessToken) return res.status(401).send({ message: "Access token is required" });
    const user = await User.findOne({ accessToken : accessToken });
    if(!user) return res.status(404).send({ message: "User not found" });
    
    const gardens = await Garden.find({ owner: user._id });
    if(gardens.length === 0) return res.status(404).send({ message: "Gardens not found" });
    res.status(200).send(gardens);
}

const findAllGardens = async (req: Request, res: Response) => {
    const gardens = await Garden.find();
    if(gardens.length === 0) return res.status(404).send({ message: "Gardens not found" });
    res.status(200).send(gardens);
}

function transformAddress(street: string): string
{
    return street.split(' ').join('+');
}

export { register, findGardenByUser, findAllGardens };