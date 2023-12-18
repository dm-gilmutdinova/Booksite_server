import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarURL: String,
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.model('User', EmployeeSchema);
export default EmployeeModel;
