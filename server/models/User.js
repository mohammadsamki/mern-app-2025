import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    username: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    password: { type: String, required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true }
);

// Hide sensitive fields when converting to JSON
userSchema.set('toJSON', {
  transform: function (_doc, ret) {
    delete ret.password;
    return ret;
  }
});

export default mongoose.model('User', userSchema);
