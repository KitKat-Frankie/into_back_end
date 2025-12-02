import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        //Validation User Input Fields

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }] });
        if (existingUser) {
            return res.status(409).json({ message: "Username or email already in use." });
        }

        // Create new user
        // const newUser = new User({ username, password, email });
        // await newUser.save();

        const user = await User.create({
            username,
            password: password, // Assume password is hashed before saving
            email: email.toLowerCase()
        });

        res.status(201).json({ message: "User registered successfully.", userId: user._id, username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

export { registerUser };    