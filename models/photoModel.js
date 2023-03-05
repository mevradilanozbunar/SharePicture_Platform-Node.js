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
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      url: {
        type: String,
        required: true,
      },
      image_id: {
        type: String,
      },
},
{
    timestamps: true
}
);

const Photo = mongoose.model('Photo', photos);

export default Photo;