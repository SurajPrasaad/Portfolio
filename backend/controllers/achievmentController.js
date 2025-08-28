// controllers/achievementController.js
import Achievement from "../models/Achievment.model.js";
import User from "../models/User.model.js";


export const addAchievement = async (req, res) => {
  try {
    const { title, description, date } = req.body;
     const userId = req.user.id;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const achievement = await Achievement.create({
      title,
      description,
      date,
      user: userId, // storing which user created it
    });

    await achievement.save();

    await User.findByIdAndUpdate(userId, {
      $push: { achievements: achievement._id },
    });

    res.status(201).json({
      message: "Achievement added successfully",
      achievement,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().populate(
      "user",
      "name email"
    );
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findById(id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    // Only creator or admin can update
    if (
      achievement.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedAchievement = await Achievement.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Achievement updated successfully",
      achievement: updatedAchievement,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findById(id);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    await achievement.deleteOne();

    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
