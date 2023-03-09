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
      url: {
        type: String,
        required: true,
      },
      image_public_id: {
        type: String,
      },

},
{
    timestamps: true
}
);

const Photo = mongoose.model('Photo', photos);

export default Photo;