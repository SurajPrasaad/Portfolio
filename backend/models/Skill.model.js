import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, 
    level: { 
      type: String, 
      enum: ["Beginner", "Intermediate", "Advanced"], 
      default: "Beginner" 
    },
    category: { type: String, trim: true }, // e.g., Frontend, Backend, Tools
    icon: { type: String, trim: true }, // store icon URL or class name
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // auto add createdAt & updatedAt
);

// Optional: Ensure unique skill per user (avoid duplicates like two "React" skills for same user)
skillSchema.index({ name: 1, createdBy: 1 }, { unique: true });

export default mongoose.model("Skill", skillSchema);
