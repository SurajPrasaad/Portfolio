import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  profileImage: { type: String },
  bio: { type: String },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    website: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
