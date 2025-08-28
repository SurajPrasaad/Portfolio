import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Achievement from "../models/Achievment.model.js";
import SkillModel from "../models/Skill.model.js";
import experienceModel from "../models/experience.model.js";
import EducationModel from "../models/Education.model.js";
import BlogModel from "../models/Blog.model.js";
import ProjectModel from "../models/Project.model.js";

// -------------------- REGISTER --------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, profileImage, bio, socialLinks } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      profileImage: profileImage || "",
      bio: bio || "",
      socialLinks: socialLinks || {},
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const { password: _, ...userData } = user._doc;
    res.status(201).json({ token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- LOGIN --------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const { password: _, ...userData } = user._doc;
    res.json({ token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- GET USER --------------------
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- UPDATE USER --------------------
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, profileImage, bio, socialLinks } = req.body;

    // Only allow user to update their own profile or admin
    if (req.user._id.toString() !== id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (profileImage) user.profileImage = profileImage;
    if (socialLinks) user.socialLinks = { ...user.socialLinks, ...socialLinks };
    if (password) user.password = await bcrypt.hash(password, 10);

    // Only admin can update role
    if (role && req.user.role === "admin") user.role = role;

    const updatedUser = await user.save();
    const { password: _, ...userData } = updatedUser._doc;

    res.json({ message: "User updated successfully", user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- DELETE USER --------------------
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only admin can delete
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch User basic info
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch related data
    const achievements = await Achievement.find({ createdBy: userId });
    const skills = await SkillModel.find({ createdBy: userId });
    const experiences = await experienceModel.find({ createdBy: userId });
    const educations = await EducationModel.find({ createdBy: userId });
    const blogs = await BlogModel.find({ createdBy: userId });
    const projects = await ProjectModel.find({ createdBy: userId });

    res.status(200).json({
      user,
      achievements,
      skills,
      experiences,
      educations,
      blogs,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};