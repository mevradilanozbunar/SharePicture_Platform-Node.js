import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username area is required'],
        lowercase: true,
        validate: [validator.isAlphanumeric, 'Only Alphanumeric characters'],
      },
      email: {
        type: String,
        required: [true, 'Email area is required'],
        unique: true,
        validate: [validator.isEmail, 'Valid email is required'],
      },
      password: {
        type: String,
        required: [true, 'Password area is required'],
        minLength: [4, 'At least 4 characters'],
      },
      followers: [
        {
          type:mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      followings: [
        {
          type:mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      imageUrl: {
        type: String,default: 'https://res.cloudinary.com/dqumwwnmj/image/upload/v1678733287/Photo_Share_App/usee_iopq33.jpg'
      },
      image_public_id: {
        type: String,
      },
      userAbout: {
        type: String,default: 'user description area'
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