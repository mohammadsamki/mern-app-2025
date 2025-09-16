//  create a model for prod that contain : name , dis , price , images array and category reference from the category model
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String, trim: true }], // Array of image URLs or paths
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);