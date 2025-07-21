import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobsApi, commentsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CommentBox from '../components/CommentBox';
import Loader from '../components/Loader';

const JobDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            setLoading(true);
            try {
                // Fetch job details
                const jobResponse = await jobsApi.getJobById(id);
                if (jobResponse.success) {
                    setJob(jobResponse.data);

                    // Fetch comments for this job
                    const commentsResponse = await commentsApi.getComments(id, 'job');
                    if (commentsResponse.success) {
                        setComments(commentsResponse.data);
                    }

                    setError(null);
                } else {
                    setError('Failed to fetch job details.');
                }
            } catch (err) {
                setError('An error occurred while fetching job details.');
                console.error('Error fetching job details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleAddComment = async (commentData) => {
        try {
            const response = await commentsApi.addComment(commentData);
            if (response.success) {
                setComments([...comments, response.data]);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleEditComment = async (commentId, text) => {
        try {
            const response = await commentsApi.updateComment(commentId, text);
            if (response.success) {
                setComments(comments.map(comment =>
                    comment.id === commentId ? { ...comment, text } : comment
                ));
            }
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await commentsApi.deleteComment(commentId);
            if (response.success) {
                setComments(comments.filter(comment => comment.id !== commentId));
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader size="large" text="Loading job details..." />
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
                    <p className="text-red-500 mb-6">{error || 'Job not found'}</p>
                    <Link to="/jobs" className="btn-primary">
                        Back to Jobs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex mb-6" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-700 hover:text-primary-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <Link to="/jobs" className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2">
                                    Jobs
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-500 md:ml-2 font-medium truncate">
                                    {job.title}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Job Details Card */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                                    {job.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                                <p className="text-xl text-gray-700 mb-4">{job.company}</p>
                            </div>
                            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center mt-4 text-gray-600">
                            <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{job.location}</span>
                        </div>

                        <div className="flex items-center mt-2 text-gray-600">
                            <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Posted on {formatDate(job.postedDate)}</span>
                        </div>

                        <div className="border-t border-gray-200 my-6"></div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
                            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
                            <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h2>
                            <div className="space-y-2">
                                {/* Show email based on display preference */}
                                {(job.displayContact === 'email' || job.displayContact === 'both') && job.contactEmail && (
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${job.contactEmail}`} className="text-primary-600 hover:underline">
                                            {job.contactEmail}
                                        </a>
                                    </div>
                                )}

                                {/* Show phone based on display preference */}
                                {(job.displayContact === 'phone' || job.displayContact === 'both') && job.contactPhone && (
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <a href={`tel:${job.contactPhone}`} className="text-primary-600 hover:underline">
                                            {job.contactPhone}
                                        </a>
                                    </div>
                                )}

                                {/* Fallback for old data structure */}
                                {!job.displayContact && job.contactInfo && (
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${job.contactInfo}`} className="text-primary-600 hover:underline">
                                            {job.contactInfo}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            {/* Apply button - use email or phone based on preference */}
                            {job.contactEmail && (job.displayContact === 'email' || job.displayContact === 'both') ? (
                                <a
                                    href={`mailto:${job.contactEmail}`}
                                    className="btn-primary flex items-center"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Apply by Email
                                </a>
                            ) : job.contactPhone && (job.displayContact === 'phone' || job.displayContact === 'both') ? (
                                <a
                                    href={`tel:${job.contactPhone}`}
                                    className="btn-primary flex items-center"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call Now
                                </a>
                            ) : job.contactInfo ? (
                                <a
                                    href={`mailto:${job.contactInfo}`}
                                    className="btn-primary flex items-center"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Apply Now
                                </a>
                            ) : null}

                            <button className="btn-secondary ml-4 flex items-center">
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Save Job
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                    <CommentBox
                        comments={comments}
                        postId={id}
                        postType="job"
                        onAddComment={handleAddComment}
                        onEditComment={handleEditComment}
                        onDeleteComment={handleDeleteComment}
                    />
                </div>

                {/* Similar Jobs - Placeholder */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Jobs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold">Similar job listings will appear here</h3>
                            <p className="text-gray-600 mt-2">This feature is coming soon.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;