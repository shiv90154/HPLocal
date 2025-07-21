import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { jobsApi, servicesApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';

const Profile = () => {
    const { user, updateProfile, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [userJobs, setUserJobs] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (activeTab === 'jobs') {
            fetchUserJobs();
        } else if (activeTab === 'services') {
            fetchUserServices();
        }
    }, [activeTab, user]);

    const fetchUserJobs = async () => {
        setLoading(true);
        try {
            // In a real app, you would filter by user ID
            const response = await jobsApi.getJobs();
            if (response.success) {
                // Filter jobs posted by the current user
                const filteredJobs = response.data.filter(job => job.postedBy === user.id);
                setUserJobs(filteredJobs);
            }
        } catch (error) {
            console.error('Error fetching user jobs:', error);
            toast.error('Failed to load your job listings');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserServices = async () => {
        setLoading(true);
        try {
            // In a real app, you would filter by user ID
            const response = await servicesApi.getServices();
            if (response.success) {
                // Filter services posted by the current user
                const filteredServices = response.data.filter(service => service.postedBy === user.id);
                setUserServices(filteredServices);
            }
        } catch (error) {
            console.error('Error fetching user services:', error);
            toast.error('Failed to load your service listings');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (jobId) => {
        try {
            const response = await jobsApi.deleteJob(jobId);
            if (response.success) {
                setUserJobs(userJobs.filter(job => job.id !== jobId));
                toast.success('Job deleted successfully');
            } else {
                toast.error('Failed to delete job');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            toast.error('An error occurred while deleting the job');
        }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            const response = await servicesApi.deleteService(serviceId);
            if (response.success) {
                setUserServices(userServices.filter(service => service.id !== serviceId));
                toast.success('Service deleted successfully');
            } else {
                toast.error('Failed to delete service');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('An error occurred while deleting the service');
        }
    };

    const profileFormik = useFormik({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            location: user?.location || '',
            bio: user?.bio || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string(),
            location: Yup.string(),
            bio: Yup.string().max(500, 'Bio must be 500 characters or less'),
        }),
        onSubmit: async (values) => {
            setIsUpdating(true);
            try {
                const result = await updateProfile(values);
                if (result.success) {
                    toast.success('Profile updated successfully');
                } else {
                    toast.error(result.error || 'Failed to update profile');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                toast.error('An error occurred while updating your profile');
            } finally {
                setIsUpdating(false);
            }
        },
    });

    const passwordFormik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Current password is required'),
            newPassword: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('New password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: async (values) => {
            // This would be implemented with a real API
            toast.success('Password updated successfully (Demo)');
            passwordFormik.resetForm();
        },
    });

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-primary-600 text-white p-6">
                        <div className="flex items-center">
                            <div className="h-20 w-20 rounded-full bg-primary-300 text-primary-800 flex items-center justify-center text-3xl font-bold">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="ml-6">
                                <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
                                <p className="text-primary-100">{user?.email || 'user@example.com'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'profile'
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('jobs')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'jobs'
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                My Jobs
                            </button>
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'services'
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                My Services
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'security'
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Security
                            </button>
                        </nav>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                                <form onSubmit={profileFormik.handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className={`input-field ${profileFormik.touched.name && profileFormik.errors.name ? 'border-red-500' : ''
                                                    }`}
                                                {...profileFormik.getFieldProps('name')}
                                            />
                                            {profileFormik.touched.name && profileFormik.errors.name ? (
                                                <p className="mt-1 text-sm text-red-600">{profileFormik.errors.name}</p>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className={`input-field ${profileFormik.touched.email && profileFormik.errors.email ? 'border-red-500' : ''
                                                    }`}
                                                {...profileFormik.getFieldProps('email')}
                                            />
                                            {profileFormik.touched.email && profileFormik.errors.email ? (
                                                <p className="mt-1 text-sm text-red-600">{profileFormik.errors.email}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                className={`input-field ${profileFormik.touched.phone && profileFormik.errors.phone ? 'border-red-500' : ''
                                                    }`}
                                                {...profileFormik.getFieldProps('phone')}
                                            />
                                            {profileFormik.touched.phone && profileFormik.errors.phone ? (
                                                <p className="mt-1 text-sm text-red-600">{profileFormik.errors.phone}</p>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                                Location
                                            </label>
                                            <input
                                                id="location"
                                                name="location"
                                                type="text"
                                                className={`input-field ${profileFormik.touched.location && profileFormik.errors.location ? 'border-red-500' : ''
                                                    }`}
                                                {...profileFormik.getFieldProps('location')}
                                            />
                                            {profileFormik.touched.location && profileFormik.errors.location ? (
                                                <p className="mt-1 text-sm text-red-600">{profileFormik.errors.location}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                                            Bio
                                        </label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            rows={4}
                                            className={`input-field ${profileFormik.touched.bio && profileFormik.errors.bio ? 'border-red-500' : ''
                                                }`}
                                            placeholder="Tell us a bit about yourself"
                                            {...profileFormik.getFieldProps('bio')}
                                        ></textarea>
                                        {profileFormik.touched.bio && profileFormik.errors.bio ? (
                                            <p className="mt-1 text-sm text-red-600">{profileFormik.errors.bio}</p>
                                        ) : null}
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="btn-primary"
                                            disabled={isUpdating}
                                        >
                                            {isUpdating ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Updating...
                                                </>
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Jobs Tab */}
                        {activeTab === 'jobs' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">My Job Listings</h2>
                                    <Link to="/create-job" className="btn-primary">
                                        Post New Job
                                    </Link>
                                </div>

                                {loading ? (
                                    <div className="flex justify-center py-12">
                                        <Loader size="large" text="Loading your jobs..." />
                                    </div>
                                ) : userJobs.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs posted yet</h3>
                                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new job listing.</p>
                                        <div className="mt-6">
                                            <Link to="/create-job" className="btn-primary">
                                                Post a Job
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {userJobs.map(job => (
                                            <div key={job.id} className="relative">
                                                <PostCard
                                                    id={job.id}
                                                    title={job.title}
                                                    subtitle={job.company}
                                                    location={job.location}
                                                    category={job.category}
                                                    date={job.postedDate}
                                                    type="job"
                                                />
                                                <div className="absolute top-2 right-2 flex space-x-1">
                                                    <Link
                                                        to={`/edit-job/${job.id}`}
                                                        className="p-1 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteJob(job.id)}
                                                        className="p-1 bg-gray-100 rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Services Tab */}
                        {activeTab === 'services' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">My Service Listings</h2>
                                    <Link to="/create-service" className="btn-primary bg-green-600 hover:bg-green-700">
                                        Post New Service
                                    </Link>
                                </div>

                                {loading ? (
                                    <div className="flex justify-center py-12">
                                        <Loader size="large" text="Loading your services..." />
                                    </div>
                                ) : userServices.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-lg font-medium text-gray-900">No services posted yet</h3>
                                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new service listing.</p>
                                        <div className="mt-6">
                                            <Link to="/create-service" className="btn-primary bg-green-600 hover:bg-green-700">
                                                Post a Service
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {userServices.map(service => (
                                            <div key={service.id} className="relative">
                                                <PostCard
                                                    id={service.id}
                                                    title={service.title}
                                                    subtitle={service.provider}
                                                    location={service.location}
                                                    category={service.category}
                                                    date={service.postedDate}
                                                    rating={service.rating}
                                                    type="service"
                                                />
                                                <div className="absolute top-2 right-2 flex space-x-1">
                                                    <Link
                                                        to={`/edit-service/${service.id}`}
                                                        className="p-1 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteService(service.id)}
                                                        className="p-1 bg-gray-100 rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>

                                <div className="mb-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                                    <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                Current Password
                                            </label>
                                            <input
                                                id="currentPassword"
                                                name="currentPassword"
                                                type="password"
                                                className={`input-field ${passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? 'border-red-500' : ''
                                                    }`}
                                                {...passwordFormik.getFieldProps('currentPassword')}
                                            />
                                            {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? (
                                                <p className="mt-1 text-sm text-red-600">{passwordFormik.errors.currentPassword}</p>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                New Password
                                            </label>
                                            <input
                                                id="newPassword"
                                                name="newPassword"
                                                type="password"
                                                className={`input-field ${passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? 'border-red-500' : ''
                                                    }`}
                                                {...passwordFormik.getFieldProps('newPassword')}
                                            />
                                            {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? (
                                                <p className="mt-1 text-sm text-red-600">{passwordFormik.errors.newPassword}</p>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm New Password
                                            </label>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                className={`input-field ${passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? 'border-red-500' : ''
                                                    }`}
                                                {...passwordFormik.getFieldProps('confirmPassword')}
                                            />
                                            {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? (
                                                <p className="mt-1 text-sm text-red-600">{passwordFormik.errors.confirmPassword}</p>
                                            ) : null}
                                        </div>

                                        <div className="flex justify-end">
                                            <button type="submit" className="btn-primary">
                                                Update Password
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
                                    <div className="space-y-4">
                                        <button
                                            onClick={logout}
                                            className="btn-secondary w-full md:w-auto"
                                        >
                                            Log Out
                                        </button>
                                        <button className="text-red-600 hover:text-red-800 font-medium">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;