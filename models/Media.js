import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  title: String,
  file: Buffer,
  contentType: String,
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model('Media', mediaSchema);