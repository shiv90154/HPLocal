const express = require('express');
const { check } = require('express-validator');
const {
  getComments,
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router
  .route('/:postId/comments')
  .get(getComments)
  .post(
    protect,
    [
      check('text', 'Comment text is required').not().isEmpty()
    ],
    addComment
  );

router
  .route('/:postId/comments/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;