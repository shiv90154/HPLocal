const express = require('express');
const { check } = require('express-validator');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getUserPosts
} = require('../controllers/postController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(getPosts)
  .post(
    protect,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('type', 'Type must be either job or service').isIn(['job', 'service']),
      check('category', 'Category is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('contactInfo', 'Contact information is required').not().isEmpty()
    ],
    createPost
  );

router
  .route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/user/:userId').get(getUserPosts);

module.exports = router;