import {Post} from "../models/post.model.js";

const createPost = async (req, res) => {
try {
    const { name, description, age } = req.body;
    
    if (!name || !description || !age) {
        return res.status(400).json({ message: "All fields are required." });
    }
    
    const newPost = new Post({ name, description, age });
    await newPost.save();
    
    res.status(201).json({ message: "Post created successfully.", postId: newPost._id });
} catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
}
};

const getAllPosts = async (req, res) => {
    // Logic to get posts would go here
    try {
        const posts = await Post.find();
        res.status(200).json({"All Posts": posts });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." });
    }
};

const getPostById = async (req, res) => {
    // Logic to get a post by ID would go here

    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        res.status(200).json(post); 
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." });
        
    }
};

const updatePostById = async (req, res) => {
    // Logic to update a post by ID would go here

    try {
        const { id } = req.params;
        const { name, description, age } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Update fields if provided
        if (name) post.name = name;
        if (description) post.description = description;
        if (age) post.age = age;

        await post.save();
        res.status(200).json({ message: "Post updated successfully.", post });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." });
    }
};

const deletePostById = async (req, res) => {
    // Logic to delete a post by ID would go here
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        res.status(200).json({ message: "Post deleted successfully." });
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error." });
        
    }
};

export { createPost, getAllPosts, getPostById, updatePostById, deletePostById };