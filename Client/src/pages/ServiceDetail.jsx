import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesApi, commentsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import CommentBox from '../components/CommentBox';
import Loader from '../components/Loader';

const ServiceDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [service, setService] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            setLoading(true);
            try {
                // Fetch service details
                const serviceResponse = await servicesApi.getServiceById(id);
                if (serviceResponse.success) {
                    setService(serviceResponse.data);

                    // Fetch comments for this service
                    const commentsResponse = await commentsApi.getComments(id, 'service');
                    if (commentsResponse.success) {
                        setComments(commentsResponse.data);
                    }

                    setError(null);
                } else {
                    setError('Failed to fetch service details.');
                }
            } catch (err) {
                setError('An error occurred while fetching service details.');
                console.error('Error fetching service details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetails();
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
                <Loader size="large" text="Loading service details..." />
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
                    <p className="text-red-500 mb-6">{error || 'Service not found'}</p>
                    <Link to="/services" className="btn-primary bg-green-600 hover:bg-green-700">
                        Back to Services
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
                            <Link to="/" className="text-gray-700 hover:text-green-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <Link to="/services" className="ml-1 text-gray-700 hover:text-green-600 md:ml-2">
                                    Services
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-500 md:ml-2 font-medium truncate">
                                    {service.title}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Service Details Card */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
                                    {service.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h1>
                                <p className="text-xl text-gray-700 mb-4">Provided by {service.provider}</p>
                            </div>
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mt-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-gray-700">{service.rating.toFixed(1)} out of 5</span>
                            </div>
                        </div>

                        <div className="flex items-center mt-4 text-gray-600">
                            <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{service.location}</span>
                        </div>

                        <div className="flex items-center mt-2 text-gray-600">
                            <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Posted on {formatDate(service.postedDate)}</span>
                        </div>

                        <div className="border-t border-gray-200 my-6"></div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Description</h2>
                            <p className="text-gray-700 whitespace-pre-line">{service.description}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h2>
                            <div className="space-y-2">
                                {/* Show email based on display preference */}
                                {(service.displayContact === 'email' || service.displayContact === 'both') && service.contactEmail && (
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${service.contactEmail}`} className="text-green-600 hover:underline">
                                            {service.contactEmail}
                                        </a>
                                    </div>
                                )}

                                {/* Show phone based on display preference */}
                                {(service.displayContact === 'phone' || service.displayContact === 'both') && service.contactPhone && (
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <a href={`tel:${service.contactPhone}`} className="text-green-600 hover:underline">
                                            {service.contactPhone}
                                        </a>
                                    </div>
                                )}

                                {/* Fallback for old data structure */}
                                {!service.displayContact && service.contactInfo && (
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${service.contactInfo}`} className="text-green-600 hover:underline">
                                            {service.contactInfo}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex">
                            {/* Contact button - use email or phone based on preference */}
                            {service.contactEmail && (service.displayContact === 'email' || service.displayContact === 'both') ? (
                                <a
                                    href={`mailto:${service.contactEmail}`}
                                    className="btn-primary bg-green-600 hover:bg-green-700 flex items-center"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email Provider
                                </a>
                            ) : service.contactPhone && (service.displayContact === 'phone' || service.displayContact === 'both') ? (
                                <a
                                    href={`tel:${service.contactPhone}`}
                                    className="btn-primary bg-green-600 hover:bg-green-700 flex items-center"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call Provider
                                </a>
                            ) : service.contactInfo ? (
                                <a
                                    href={`mailto:${service.contactInfo}`}
                                    className="btn-primary bg-green-600 hover:bg-green-700 flex items-center"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact Provider
                                </a>
                            ) : null}

                            <button className="btn-secondary ml-4 flex items-center">
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Save Service
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                    <CommentBox
                        comments={comments}
                        postId={id}
                        postType="service"
                        onAddComment={handleAddComment}
                        onEditComment={handleEditComment}
                        onDeleteComment={handleDeleteComment}
                    />
                </div>

                {/* Similar Services - Placeholder */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold">Similar service listings will appear here</h3>
                            <p className="text-gray-600 mt-2">This feature is coming soon.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;