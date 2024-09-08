import Post from "../models/post.js";
import mongoose from "mongoose";

const getPosts = async (req, res) => {
  try {
    const postMessage = await Post.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export {
  getPosts
};
