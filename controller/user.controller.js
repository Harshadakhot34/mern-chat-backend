import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenSaveCookie from "../jwt/genarateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    //hasing the password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      fullname,
      email,
      password: hashPassword,
    });

    await newUser.save();

    if (newUser) {
      createTokenSaveCookie(newUser._id, res);
      res.status(201).json({ message: "User created successfully.", newUser });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong.." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(20``).json({
      message: "User logged out successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong.." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isMatch = bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invaild user credential" });
    }

    createTokenSaveCookie(user._id, res);
    res.status(200).json({
      message: "User logged in successfully.",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong.." });
  }
};
