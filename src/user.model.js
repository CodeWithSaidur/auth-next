import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    vToken: String,
    vTokenExp: Date,
    fpToken: String,
    fpTokenExp: Date
  },
  {
    timestamps: true
  }
)

export const User = mongoose.models.User || mongoose.model('User', userSchema)
