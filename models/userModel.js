import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
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

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

export default User;