import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "Default_Secret_Key";

const register = async (req: Request, res: Response) => {
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
    const token = jwt.sign({ userId }, secretKey, { expiresIn: "24h" });
    const accessToken = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
    user.token = token;
    user.accessToken = accessToken;
    await user.save();

    res.status(201).json({ accessToken });
};

const login = async (req: Request, res: Response) => {
    let admin = false;
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail });
    if (!user) return res.status(404).send({ message: "User not found" });
    if (user.role === "admin") admin = true;
    const userAccessToken = user.accessToken;
    const userToken = user.token;
    if (!(await bcrypt.compare(password, user.password!))) return res.status(401).send({ message: "Password is incorrect" });

    const isUserAccessTokenExpired = verifyToken(userAccessToken!, 1);
    if(!isUserAccessTokenExpired) return res.status(200).json({ accessToken: userAccessToken, admin });
    const isUserTokenExpired = verifyToken(userToken!, 24);
    if (!isUserTokenExpired) {
        const userId = { userId: user._id };
        const newAccessToken = jwt.sign(userId, secretKey, { expiresIn: "1h" });
        user.accessToken = newAccessToken;
        await user.save();
        return res.status(200).json({ accessToken: newAccessToken, admin });
    } else {
        const newToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "24h" });
        user.token = newToken;
        const newAccessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
        user.accessToken = newAccessToken;
        await user.save();
        return res.status(200).json({ accessToken: newAccessToken, admin });
    }
};

const deleteAccount = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });

    const { mail } = req.body;
    const user = await User.findOne({ mail });
    if (!user) return res.status(403).send({ message: "User not found" });
    await User.findByIdAndDelete(user._id);
    res.status(204).send({ message: "User deleted" });
};

const verifyToken = (token: string, expirationTimeInHours: number): boolean => {
    let isExpired = false;
    const dateNow = new Date();
    const expirationTimeInSeconds = expirationTimeInHours * 60 * 60; // Convertir les heures en secondes

    try {
        const decoded = jwt.verify(token, secretKey) as { exp: number };
        if (decoded.exp < dateNow.getTime() / 1000) {
            isExpired = true;
        } else {
            const tokenAgeInSeconds = dateNow.getTime() / 1000 - decoded.exp;
            if (tokenAgeInSeconds > expirationTimeInSeconds) {
                isExpired = true;
            }
        }
    } catch (err) {
        isExpired = true;
        console.log(err);
    }

    return isExpired;
};

const verify = async (req: Request, res: Response) => {
    let admin = false;
    const { accessToken } = req.body;

    if (!accessToken) return res.status(400).send({ message: "Token is required" });

    const user = await User.findOne({ accessToken: accessToken });
    if (!user) return res.status(404).send({ message: "User not found" });
    if (user.role === "admin") admin = true;

    const isAccessTokenExpired = verifyToken(accessToken, 1);

    if (!isAccessTokenExpired) {
        return res.status(200).json({ accessToken: accessToken, admin });
    }

    const userToken = user.token;
    if (!userToken) return res.status(404).send({ message: "Token not found" }); // Pirate

    const isUserTokenExpired = verifyToken(userToken, 24);

    if (!isUserTokenExpired && isAccessTokenExpired) {
        const userId = { userId: user._id };
        let newAccessToken;
        try {
            newAccessToken = jwt.sign(userId, secretKey, { expiresIn: "1h" });
            user.accessToken = newAccessToken;
            await user.save();
        } catch (err) {
            return res.status(500).send({ message: "Internal server error" });
        }
        return res.status(200).json({ accessToken: newAccessToken, admin });
    }

    return res.status(401).send({ message: "Token has expired" }); //disconnect
};

export { register, login, deleteAccount, verify };
