import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";


const register = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });
    const { firstname, lastname, mail, password, rules, newsletter, role } = req.body;
    if (await User.findOne({ mail: mail })) return res.status(400).send({ message: "User already exists" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
        firstname: firstname,
        lastname: lastname,
        mail: mail,
        password: passwordHash,
        rules: rules,
        isNewsletter: newsletter,
        role: role,
    });
    const userId = { userId: user._id };

    await user.save();

    res.status(201).json({ user});
};

const login = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail });
    if (!user) return res.status(404).send({ message: "User not found" });

    if (!(await bcrypt.compare(password, user.password!))) return res.status(409).send({ message: "Password is incorrect" });

    const userId = { userId: user._id };

    await user.save();

    res.status(200).json({ user});
};

const deleteAccount = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });

    const { mail } = req.body;
    const user = await User.findOne({ mail });
    if (!user) return res.status(403).send({ message: "User not found" });
    await User.findByIdAndDelete(user._id);
    res.status(204).send({ message: "User deleted" });
};


export { register, login, deleteAccount};