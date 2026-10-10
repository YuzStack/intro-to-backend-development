import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLenght: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLenght: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Before saving any password, we need to hash it
userSchema.pre('save', async function () {
  // If the password hasn't changed, skip hashing and stop execution here
  if (!this.isModified('password')) return;

  // Hash the password and overwrite the plain text
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare provided password with stored password (of the user in the database)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
