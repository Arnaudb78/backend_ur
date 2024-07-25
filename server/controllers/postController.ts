import { Request, Response } from "express";
import Post from "../models/postModel";
import Thread from "../models/threadModel";
import Category from "../models/categoryModel";
import User from "../models/userModel";

const createPost = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Post cannot be empty" });
    const { accessToken, content, thread } = req.body;
    if (!accessToken) return res.status(401).send({ message: "No token detected" });

    try {
        const user = await User.findOne({ accessToken: accessToken });
        if (!user) return res.status(404).send({ message: "User not found" });
        const findThread = await Thread.findOne({ _id: thread });
        if (!findThread) return res.status(404).send({ message: "Thread not found" });
        const author = user.firstname + " " + user.lastname;

        const post = new Post({
            content,
            thread : findThread._id,
            author,
        });

        await post.save();

        findThread.posts.push(post._id);
        await findThread.save();
        
        return res.status(201).send(post);
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
}

const getAllPostByThread = async (req: Request, res: Response) => {
    if (!req.params.id) return res.status(400).send({ message: "Thread id is required" });
    const threadId = req.params.id;
    try {
        const post = await Post.find({ thread: threadId });
        return res.status(200).send(post);
    } catch (err: any) {
        return res.status(500).send({ message: err.message });
    }
}

export { createPost, getAllPostByThread };