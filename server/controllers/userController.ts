import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "Default_Secret_Key";

const register = async (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });
    const { firstname, lastname, mail, password, rules, newsletter } = req.body;
    if (await User.findOne({ mail: mail })) return res.status(409).send({ message: "User already exists" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
        firstname: firstname,
        lastname: lastname,
        mail: mail,
        password: passwordHash,
        rules: rules,
        isNewsletter: newsletter,
    });
    const userId = user._id.toString();
    const accessToken = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
    user.accessToken = accessToken;
    await user.save();

    res.status(201).json({ accessToken });
};

const login = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail });
    if (!user) return res.status(404).send({ message: "User not found" });

    if (!(await bcrypt.compare(password, user.password!))) return res.status(401).send({ message: "Password is incorrect" });

    const userId = { userId: user._id };
    const accessToken = jwt.sign(userId, secretKey, { expiresIn: "1h" });
    user.accessToken = accessToken;

    await user.save();

    res.status(200).json({ accessToken });
};

const deleteAccount = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });

    const { mail } = req.body;
    const user = await User.findOne({ mail });
    if (!user) return res.status(403).send({ message: "User not found" });
    await User.findByIdAndDelete(user._id);
    res.status(204).send({ message: "User deleted" });
};

export { register, login, deleteAccount };
