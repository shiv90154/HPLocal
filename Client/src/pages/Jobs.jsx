import { useState, useEffect } from 'react';
import { jobsApi } from '../services/api';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('');
    const [selectedSalary, setSelectedSalary] = useState('');

    // Locations in Himachal Pradesh
    const locations = [
        'All Locations', 'Shimla', 'Manali', 'Dharamshala', 'Kullu',
        'Mandi', 'Solan', 'Bilaspur', 'Hamirpur', 'Una', 'Chamba'
    ];

    // Categories
    const categories = [
        'All Categories', 'IT', 'Hospitality', 'Tourism', 'Education',
        'Healthcare', 'Retail', 'Construction', 'Agriculture', 'Government'
    ];

    // Job Types
    const jobTypes = [
        'All Types', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'
    ];

    // Salary Ranges
    const salaryRanges = [
        'All Salaries', 'Below ₹10,000', '₹10,000 - ₹20,000', '₹20,000 - ₹30,000',
        '₹30,000 - ₹50,000', 'Above ₹50,000'
    ];

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async (filters = {}) => {
        setLoading(true);
        try {
            const response = await jobsApi.getJobs(filters);
            if (response.success) {
                setJobs(response.data);
                setError(null);
            } else {
                setError('Failed to fetch jobs. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while fetching jobs.');
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filters = {
            search: searchTerm,
            location: selectedLocation === 'All Locations' ? '' : selectedLocation,
            category: selectedCategory === 'All Categories' ? '' : selectedCategory,
            jobType: selectedJobType === 'All Types' ? '' : selectedJobType,
            salary: selectedSalary === 'All Salaries' ? '' : selectedSalary
        };
        fetchJobs(filters);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedLocation('');
        setSelectedCategory('');
        setSelectedJobType('');
        setSelectedSalary('');
        fetchJobs();
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-primary-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-bold">Find Jobs in Himachal Pradesh</h1>
                    <p className="mt-2 text-lg">Browse through available job opportunities across the state</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <form onSubmit={handleSearch}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="lg:col-span-2">
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    className="input-field"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div>
                                <select
                                    className="input-field"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                >
                                    {locations.map((location, index) => (
                                        <option key={index} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    className="input-field"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <button type="submit" className="btn-primary w-full">
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Advanced Filters */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <select
                                    className="input-field"
                                    value={selectedJobType}
                                    onChange={(e) => setSelectedJobType(e.target.value)}
                                >
                                    {jobTypes.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    className="input-field"
                                    value={selectedSalary}
                                    onChange={(e) => setSelectedSalary(e.target.value)}
                                >
                                    {salaryRanges.map((range, index) => (
                                        <option key={index} value={range}>
                                            {range}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="btn-secondary w-full"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Jobs List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader size="large" text="Loading jobs..." />
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={() => fetchJobs()}
                            className="mt-4 btn-primary"
                        >
                            Try Again
                        </button>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-medium text-gray-900">No jobs found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your search filters</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map(job => (
                                <PostCard
                                    key={job.id}
                                    id={job.id}
                                    title={job.title}
                                    subtitle={job.company}
                                    location={job.location}
                                    category={job.category}
                                    date={job.postedDate}
                                    type="job"
                                />
                            ))}
                        </div>

                        {/* Pagination - can be implemented later */}
                        <div className="mt-8 flex justify-center">
                            <nav className="inline-flex rounded-md shadow">
                                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 rounded-l-md">
                                    Previous
                                </a>
                                <a href="#" className="py-2 px-4 bg-primary-600 border border-primary-600 text-white hover:bg-primary-700">
                                    1
                                </a>
                                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                                    2
                                </a>
                                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                                    3
                                </a>
                                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 rounded-r-md">
                                    Next
                                </a>
                            </nav>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Jobs;