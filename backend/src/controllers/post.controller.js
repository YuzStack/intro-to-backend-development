import { Post } from '../models/post.model.js';

/** Create a post */
const createPost = async (req, res) => {
  try {
    // 1. Parse the request body
    const { name, description, age } = req.body;

    // 2. Do Data Validations
    // Check if all fields have valid inputs
    if (!name || !description || !age) {
      return res.status(400).json({ message: 'All fields are important!' });
    }

    // 3. Create a post
    const post = await Post.create({ name, description, age });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

/** Read all posts */
const getPosts = async (req, res) => {
  try {
    // Return all the post documents in our database
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/** Update a post */
const updatePost = async (req, res) => {
  try {
    // Basic Validation: Check if the body is empty
    // Expected data structure: {name: x, description: y, age: z} -> [name, description, age]
    if (Object.keys(req.body) === 0)
      return res.status(400).json({ message: 'No data provided for upate' });

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({ message: 'Post updated succesfully', post });
  } catch (error) {
    console.log(error.message); // Dev Mode
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/** Delete a post */
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });

    res.status(204).json({ message: 'Post deleted succesfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export { createPost, getPosts, updatePost, deletePost };
