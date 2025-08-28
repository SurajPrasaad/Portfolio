import Project from "../models/Project.model.js";

// ✅ Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink, images, featured } = req.body;

    const project = new Project({
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      images,
      featured,
      createdBy: req.user._id, // comes from authMiddleware
    });

    await project.save();
    res.status(201).json({ success: true, message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating project", error: error.message });
  }
};

// ✅ Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching projects", error: error.message });
  }
};

// ✅ Get single project by ID
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("createdBy", "name email");

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching project", error: error.message });
  }
};

// ✅ Update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // only creator can update
    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to update this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating project", error: error.message });
  }
};

// ✅ Delete project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    await project.deleteOne();
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting project", error: error.message });
  }
};
