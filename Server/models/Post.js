const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [5000, 'Description cannot be more than 5000 characters']
  },
  type: {
    type: String,
    required: [true, 'Please specify if this is a job or service'],
    enum: ['job', 'service']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  contactEmail: {
    type: String,
    required: [true, 'Please add contact email']
  },
  contactPhone: {
    type: String,
    required: false
  },
  displayContact: {
    type: String,
    enum: ['email', 'phone', 'both'],
    default: 'email'
  },
  // Job specific fields
  company: {
    type: String,
    required: function() {
      return this.type === 'job';
    }
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
    required: function() {
      return this.type === 'job';
    }
  },
  salary: {
    type: String,
    required: function() {
      return this.type === 'job';
    }
  },
  requirements: {
    type: String,
    required: function() {
      return this.type === 'job';
    }
  },
  // Service specific fields
  provider: {
    type: String,
    required: function() {
      return this.type === 'service';
    }
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Cascade delete comments when a post is deleted
PostSchema.pre('remove', async function(next) {
  await this.model('Comment').deleteMany({ post: this._id });
  next();
});

// Reverse populate with comments
PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  justOne: false
});

module.exports = mongoose.model('Post', PostSchema);