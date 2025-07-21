import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { jobsApi } from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const CreateJob = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Categories
    const categories = [
        'IT', 'Hospitality', 'Tourism', 'Education',
        'Healthcare', 'Retail', 'Construction', 'Agriculture', 'Government'
    ];

    // Locations in Himachal Pradesh
    const locations = [
        'Shimla', 'Manali', 'Dharamshala', 'Kullu',
        'Mandi', 'Solan', 'Bilaspur', 'Hamirpur', 'Una', 'Chamba'
    ];

    // Job Types
    const jobTypes = [
        'Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'
    ];

    const formik = useFormik({
        initialValues: {
            title: '',
            company: '',
            location: '',
            category: '',
            jobType: '',
            salary: '',
            description: '',
            requirements: '',
            contactEmail: user?.email || '',
            contactPhone: user?.phone || '',
            displayContact: 'email',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Job title is required')
                .min(5, 'Title must be at least 5 characters')
                .max(100, 'Title must be less than 100 characters'),
            company: Yup.string()
                .required('Company name is required')
                .min(2, 'Company name must be at least 2 characters')
                .max(50, 'Company name must be less than 50 characters'),
            location: Yup.string()
                .required('Location is required'),
            category: Yup.string()
                .required('Category is required'),
            jobType: Yup.string()
                .required('Job type is required'),
            salary: Yup.string()
                .required('Salary information is required'),
            description: Yup.string()
                .required('Job description is required')
                .min(20, 'Description must be at least 20 characters'),
            requirements: Yup.string()
                .required('Job requirements are required')
                .min(20, 'Requirements must be at least 20 characters'),
            contactEmail: Yup.string()
                .required('Contact email is required')
                .email('Must be a valid email address'),
            contactPhone: Yup.string()
                .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Phone number is not valid')
                .when('displayContact', {
                    is: (val) => val === 'phone' || val === 'both',
                    then: (schema) => schema.required('Phone number is required when selected for display'),
                    otherwise: (schema) => schema.notRequired(),
                }),
            displayContact: Yup.string()
                .required('Please select contact display preference')
                .oneOf(['email', 'phone', 'both'], 'Invalid display preference'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const response = await jobsApi.createJob({
                    ...values,
                    postedBy: user.id,
                });

                if (response.success) {
                    toast.success('Job posted successfully!');
                    navigate(`/job/${response.data.id}`);
                } else {
                    toast.error(response.error || 'Failed to post job. Please try again.');
                }
            } catch (error) {
                toast.error('An error occurred. Please try again.');
                console.error('Error posting job:', error);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h1>

                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Job Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Job Title*
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className={`input-field ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''
                                    }`}
                                placeholder="e.g. Software Developer, Hotel Manager"
                                {...formik.getFieldProps('title')}
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                            ) : null}
                        </div>

                        {/* Company Name */}
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                Company/Organization Name*
                            </label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                className={`input-field ${formik.touched.company && formik.errors.company ? 'border-red-500' : ''
                                    }`}
                                placeholder="e.g. Tech Solutions, Mountain View Resort"
                                {...formik.getFieldProps('company')}
                            />
                            {formik.touched.company && formik.errors.company ? (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.company}</p>
                            ) : null}
                        </div>

                        {/* Location and Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location*
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    className={`input-field ${formik.touched.location && formik.errors.location ? 'border-red-500' : ''
                                        }`}
                                    {...formik.getFieldProps('location')}
                                >
                                    <option value="">Select Location</option>
                                    {locations.map((location) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.location && formik.errors.location ? (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.location}</p>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Category*
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className={`input-field ${formik.touched.category && formik.errors.category ? 'border-red-500' : ''
                                        }`}
                                    {...formik.getFieldProps('category')}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.category && formik.errors.category ? (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
                                ) : null}
                            </div>
                        </div>

                        {/* Job Type and Salary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Type*
                                </label>
                                <select
                                    id="jobType"
                                    name="jobType"
                                    className={`input-field ${formik.touched.jobType && formik.errors.jobType ? 'border-red-500' : ''
                                        }`}
                                    {...formik.getFieldProps('jobType')}
                                >
                                    <option value="">Select Job Type</option>
                                    {jobTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.jobType && formik.errors.jobType ? (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.jobType}</p>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                                    Salary/Compensation*
                                </label>
                                <input
                                    id="salary"
                                    name="salary"
                                    type="text"
                                    className={`input-field ${formik.touched.salary && formik.errors.salary ? 'border-red-500' : ''
                                        }`}
                                    placeholder="e.g. ₹20,000 - ₹30,000 per month"
                                    {...formik.getFieldProps('salary')}
                                />
                                {formik.touched.salary && formik.errors.salary ? (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.salary}</p>
                                ) : null}
                            </div>
                        </div>

                        {/* Job Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Job Description*
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                className={`input-field ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''
                                    }`}
                                placeholder="Provide a detailed description of the job role, responsibilities, etc."
                                {...formik.getFieldProps('description')}
                            ></textarea>
                            {formik.touched.description && formik.errors.description ? (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                            ) : null}
                        </div>

                        {/* Job Requirements */}
                        <div>
                            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                                Job Requirements*
                            </label>
                            <textarea
                                id="requirements"
                                name="requirements"
                                rows={5}
                                className={`input-field ${formik.touched.requirements && formik.errors.requirements ? 'border-red-500' : ''
                                    }`}
                                placeholder="List qualifications, skills, experience required for this job"
                                {...formik.getFieldProps('requirements')}
                            ></textarea>
                            {formik.touched.requirements && formik.errors.requirements ? (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.requirements}</p>
                            ) : null}
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>

                            <div>
                                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Email*
                                </label>
                                <input
                                    id="contactEmail"
                                    name="contactEmail"
                                    type="email"
                                    className={`input-field ${formik.touched.contactEmail && formik.errors.contactEmail ? 'border-red-500' : ''}`}
                                    placeholder="e.g. hr@company.com"
                                    {...formik.getFieldProps('contactEmail')}
                                />
                                {formik.touched.contactEmail && formik.errors.contactEmail ? (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.contactEmail}</p>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Phone {formik.values.displayContact === 'phone' || formik.values.displayContact === 'both' ? '*' : '(optional)'}
                                </label>
                                <input
                                    id="contactPhone"
                                    name="contactPhone"
                                    type="tel"
                                    className={`input-field ${formik.touched.contactPhone && formik.errors.contactPhone ? 'border-red-500' : ''}`}
                                    placeholder="e.g. +91 98765 43210"
                                    {...formik.getFieldProps('contactPhone')}
                                />
                                {formik.touched.contactPhone && formik.errors.contactPhone ? (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.contactPhone}</p>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="displayContact" className="block text-sm font-medium text-gray-700 mb-1">
                                    Display Contact Preference*
                                </label>
                                <select
                                    id="displayContact"
                                    name="displayContact"
                                    className={`input-field ${formik.touched.displayContact && formik.errors.displayContact ? 'border-red-500' : ''}`}
                                    {...formik.getFieldProps('displayContact')}
                                >
                                    <option value="email">Show Email Only</option>
                                    <option value="phone">Show Phone Only</option>
                                    <option value="both">Show Both Email and Phone</option>
                                </select>
                                {formik.touched.displayContact && formik.errors.displayContact ? (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.displayContact}</p>
                                ) : null}
                                <p className="mt-1 text-xs text-gray-500">
                                    Choose which contact information will be visible to others on your job posting.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="btn-secondary"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Posting Job...
                                    </>
                                ) : (
                                    'Post Job'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateJob;