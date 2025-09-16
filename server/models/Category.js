//  crete a model for category with name and description and image 
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true } // URL or path to the image
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);