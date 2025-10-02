const bcrypt = require("bcryptjs");
const  User  = require("../module/UserModule");

const login = async(req , res)=>{
    console.log("Login function started"); 

    try {
        const { username, password } = req.body;
        console.log("Received request data:", { username, password });

        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log("Password mismatch");
            return res.status(400).json({ error: "Invalid username or password" });
        }

        res.status(200).json({
            message :"login"
        });
    } catch (error) {
        console.log("Error in login function:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

};

const logout = async(req , res)=>{
    try{
        res.status(200).json({
            message : "Logged out successfully"
        })
    }catch(error){
        console.log("Error in logout function:", error.message);
    }
    
}

const signup = async(req , res)=>{
    try {
		const { fullName, username, email, password } = req.body;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "Username is already taken" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email is already taken" });
		}

		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			username,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			
			await newUser.save();

			res.status(201).json({
				fullName: newUser.fullName,
				username: newUser.username,
				email: newUser.email,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}

    
}

const UserController = {
    login,
    logout,
    signup
}

module.exports = UserController;