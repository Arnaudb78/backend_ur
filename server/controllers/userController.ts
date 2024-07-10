import { Request, Response } from "express";
import User from "../models/userModel";
import { CreateUserDto, UserRole } from "../dto/userDto";
import { CustomErrorInterface } from "../interfaces/customErrorInterface";
import { BadRequestError } from "../utils/errorUtils";


const register = async (req: Request, res: Response) => {
    const { firstname, lastname, mail, password, rules, isNewsletter, accessToken, pic, role } = req.body;

    
    const createUserDto = new CreateUserDto(
        firstname,
        lastname,
        mail,
        password,
        rules,
        isNewsletter,
        accessToken,
        pic,
        role as UserRole
    );

    const newUser = new User(createUserDto);
    
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        const customError = error as CustomErrorInterface;
        res.status(customError.status || 400).json({ message: customError.message });
    }
}

export { register };