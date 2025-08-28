import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  siteTitle: String,
  siteDescription: String,
  logo: String,
  favicon: String,
  socialLinks: Object,
});

export default mongoose.model("Setting", settingSchema);
