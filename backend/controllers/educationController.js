// controllers/educationController.js
import Education from "../models/Education.model.js";

// ✅ Add new Education
export const addEducation = async (req, res) => {
  try {
    const { degree, institution, startDate, endDate, grade, description } = req.body;

    const newEducation = new Education({
      degree,
      institution,
      startDate,
      endDate,
      grade,
      description,
      createdBy: req.user.id, // coming from authMiddleware
    });

    const savedEducation = await newEducation.save();
    res.status(201).json(savedEducation);
  } catch (error) {
    res.status(500).json({ message: "Error adding education", error: error.message });
  }
};

// ✅ Get all Educations
export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find().populate("createdBy", "name email");
    res.json(educations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching educations", error: error.message });
  }
};

// ✅ Update Education
export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEducation = await Education.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEducation) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.json(updatedEducation);
  } catch (error) {
    res.status(500).json({ message: "Error updating education", error: error.message });
  }
};

// ✅ Delete Education
export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEducation = await Education.findByIdAndDelete(id);

    if (!deletedEducation) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting education", error: error.message });
  }
};
