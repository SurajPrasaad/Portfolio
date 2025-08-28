import Skill from "../models/Skill.model.js";

// 📌 Add a new Skill
export const addSkill = async (req, res) => {
  try {
    const { name, level, category, icon } = req.body;
    const createdBy = req.user._id; // assuming auth middleware sets req.user

    const skill = new Skill({ name, level, category, icon, createdBy });
    await skill.save();

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      skill,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Skill already exists for this user",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Get all skills of logged-in user
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ createdBy: req.user._id });
    res.status(200).json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Update a skill
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findOneAndUpdate(
      { _id: id, createdBy: req.user._id }, // ensure user owns it
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findOneAndDelete({
      _id: id,
      createdBy: req.user._id,
    });

    if (!skill) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
