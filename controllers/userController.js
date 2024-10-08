const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) {
			return res.status(401).json({
				message: "All fields are required!",
				success: false,
			});
		}
		const user = await User.findOne({ email });
		if (user) {
			return res.status(401).json({
				message: "User Already Exists",
				success: false,
			});
		}
		// password hashing
		const hashedPassword = await bcryptjs.hash(password, 12);

		const createdUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});
		return res.status(201).json({
			message: "Account Created Successfully",
			success: true,
		});
	} catch (error) {
		console.log("Error in createUser:", error);
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(401).json({
				message: "Email and Password are required",
				success: false,
			});
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				message: "Email or Password is Incorrect!",
				success: false,
			});
		}
		const matchPassword = await bcryptjs.compare(password, user.password);
		if (!matchPassword) {
			return res.status(401).json({
				message: "Email or Password is Incorrect!",
				success: false,
			});
		}
		// generate token
		const tokenData = {
			userId: user?._id,
		};
		const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
			expiresIn: "5d",
		});
		return res
			.status(201)
			.cookie("token", token, {
				httpOnly: true,
				maxAge: 5 * 24 * 60 * 60 * 1000,
			})
			.json({
				message: `Welcome Back ${user?.name}`,
				user,
				success: true,
			});
	} catch (error) {
		console.log("Error in loginUser:", error);
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id).select("-password");
		console.log(user);
		res.status(201).json(user);
	} catch (error) {
		console.log("Error in getUser:", error);
		res.status(500).json({
			message: "Internal Server Error",
			success: false,
		});
	}
};

module.exports = { createUser, loginUser, getUser };
