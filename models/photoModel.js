import mongoose from 'mongoose';

const photos = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

},
{
    timestamps: true
}
);

const Photo = mongoose.model('Photo', photos);

export default Photo;