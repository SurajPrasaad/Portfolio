import Experience from "../models/experience.model.js";

// ➝ Add Experience
export const addExperience = async (req, res) => {
  try {
    const { title, company, location, startDate, endDate, description, currentlyWorking } = req.body;

    const newExperience = new Experience({
      title,
      company,
      location,
      startDate,
      endDate,
      description,
      currentlyWorking,
      createdBy: req.user._id, // from authMiddleware
    });

    await newExperience.save();
    res.status(201).json({ message: "Experience added successfully", experience: newExperience });
  } catch (error) {
    res.status(500).json({ message: "Error adding experience", error: error.message });
  }
};

// ➝ Get All Experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().populate("createdBy", "name email");
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences", error: error.message });
  }
};

// ➝ Update Experience
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience updated successfully", experience: updatedExperience });
  } catch (error) {
    res.status(500).json({ message: "Error updating experience", error: error.message });
  }
};

// ➝ Delete Experience
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting experience", error: error.message });
  }
};
