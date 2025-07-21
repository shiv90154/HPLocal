import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

const CommentBox = ({ comments, postId, postType, onAddComment, onEditComment, onDeleteComment }) => {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment({
                id: Date.now(), // Temporary ID, would be replaced by backend
                text: newComment,
                userId: user.id,
                userName: user.name,
                createdAt: new Date().toISOString(),
                postId,
                postType
            });
            setNewComment('');
        }
    };

    const startEditing = (comment) => {
        setEditingId(comment.id);
        setEditText(comment.text);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditText('');
    };

    const submitEdit = (commentId) => {
        if (editText.trim()) {
            onEditComment(commentId, editText);
            setEditingId(null);
            setEditText('');
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            {/* Add Comment Form */}
            {user ? (
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                        <textarea
                            className="input-field min-h-[100px]"
                            placeholder="Add your comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-primary">
                        Post Comment
                    </button>
                </form>
            ) : (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center">
                    <p className="text-gray-600">Please log in to add comments.</p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-lg">
                                        {comment.userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium text-gray-900">{comment.userName}</p>
                                        <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                                    </div>
                                </div>

                                {/* Edit/Delete Options */}
                                {user && user.id === comment.userId && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => startEditing(comment)}
                                            className="text-gray-500 hover:text-primary-600"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => onDeleteComment(comment.id)}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Comment Content */}
                            {editingId === comment.id ? (
                                <div className="mt-3">
                                    <textarea
                                        className="input-field min-h-[80px] mb-2"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    ></textarea>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => submitEdit(comment.id)}
                                            className="btn-primary text-sm py-1 px-3"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEditing}
                                            className="btn-secondary text-sm py-1 px-3"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-3 text-gray-700">{comment.text}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 text-gray-500">
                        No comments yet. Be the first to comment!
                    </div>
                )}
            </div>
        </div>
    );
};

CommentBox.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            text: PropTypes.string.isRequired,
            userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            userName: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
    postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    postType: PropTypes.oneOf(['job', 'service']).isRequired,
    onAddComment: PropTypes.func.isRequired,
    onEditComment: PropTypes.func.isRequired,
    onDeleteComment: PropTypes.func.isRequired
};

export default CommentBox;