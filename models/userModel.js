import mongoose from 'mongoose';
const user = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username area is required'],
        lowercase: true,
        unique: true,
      },
      email: {
        type: String,
        required: [true, 'Email area is required'],
        unique: true,
      },
      password: {
        type: String,
        required: [true, 'Password area is required'],
        minLength: [4, 'At least 4 characters'],
      },
},
{
    timestamps: true
}
);

const User = mongoose.model('User', user);

export default User;