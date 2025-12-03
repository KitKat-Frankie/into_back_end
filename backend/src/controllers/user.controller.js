import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        //Validation User Input Fields

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ username: username.toLowerCase()}, { email: email.toLowerCase()}] });
        if (existingUser) {
            return res.status(409).json({ message: "Username or email already in use." });
        }

        //Create new user
        // const newUser = new User({ username, password, email });
        // await newUser.save();

                    // const user = await User.create({
                    //     username,
                    //     password: password, // Assume password is hashed before saving
                    //     email: email.toLowerCase()
                    // });

        const user = new User({username,
            password,
            email: email.toLowerCase()
});

await user.save();


        res.status(201).json({ message: "User registered successfully.", userId: user._id, username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: "Server error."});
    }
};

const loginUser = async (req, res) => {
    // Login logic would go here
    try {
        // checking if the user already exists
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase()}).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        //Compared password with the hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials."});
        }

        res.status(200).json({ message: "Login successful.", userId: user._id, username: user.username, email: user.email });
        
    } catch (error) {
       res.status(500).json( {
        message: "Internal Server Error" }
       ) 
    }
};

const logoutUser = async (req, res) => {
    try {
        const {email} = req.body;
        // Logic to handle user logout would go here

        const user = await User.findOne({ email: email.toLowerCase()});
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Perform logout operations (e.g., invalidate tokens, clear sessions)

        res.status(200).json({ message: "Logout successful." });    
    } catch (error) {
        res.status(500).json({ message: "Server error."});
    }
}


export {registerUser,
        loginUser,
        logoutUser
};

