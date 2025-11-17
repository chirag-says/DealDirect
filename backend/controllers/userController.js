import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedRole = role === "agent" ? "agent" : "user";

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt, // ✅ include joining date
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedInputEmail = (email || "").trim().toLowerCase();

    const envAgentEmail = process.env.AGENT_EMAIL;
    const envAgentPassword = process.env.AGENT_PASSWORD;
    const envAgentName = process.env.AGENT_NAME || "DealDirect Agent";
    const normalizedEnvEmail = (envAgentEmail || "").trim().toLowerCase();

    if (normalizedEnvEmail && normalizedInputEmail === normalizedEnvEmail) {
      if (!envAgentPassword) {
        return res.status(500).json({ message: "Agent password not configured" });
      }
      if (password !== envAgentPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        {
          id: "env-agent",
          email: envAgentEmail,
          role: "agent",
          isEnvAgent: true,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: "env-agent",
          name: envAgentName,
          email: envAgentEmail,
          role: "agent",
          createdAt: new Date().toISOString(),
          isEnvAgent: true,
        },
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        createdAt: user.createdAt, // ✅ include joining date
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Users (Admin Only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All users fetched successfully",
      count: users.length,
      users: users.map((u) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role || "user",
        createdAt: u.createdAt, // ✅ joining date
      })),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};
