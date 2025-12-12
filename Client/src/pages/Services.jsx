import { useState, useEffect } from 'react';
import { servicesApi } from '../services/api';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRating, setSelectedRating] = useState('');

    // Locations in Himachal Pradesh
    const locations = [
        'All Locations', 'Shimla', 'Manali', 'Dharamshala', 'Kullu',
        'Mandi', 'Solan', 'Bilaspur', 'Hamirpur', 'Una', 'Chamba'
    ];

    // Service Categories
    const categories = [
        'All Categories', 'Plumbing', 'Electrical', 'Carpentry', 'Education',
        'Healthcare', 'Beauty', 'Cleaning', 'Transportation', 'IT', 'Legal'
    ];

    // Rating Filters
    const ratings = [
        'All Ratings', '4 Stars & Above', '3 Stars & Above', '2 Stars & Above'
    ];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async (filters = {}) => {
        setLoading(true);
        try {
            const response = await servicesApi.getServices(filters);
            if (response.success) {
                setServices(response.data);
                setError(null);
            } else {
                setError('Failed to fetch services. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while fetching services.');
            console.error('Error fetching services:', err);
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
            rating: selectedRating === 'All Ratings' ? '' : selectedRating
        };
        fetchServices(filters);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedLocation('');
        setSelectedCategory('');
        setSelectedRating('');
        fetchServices();
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className=" text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-bold">Find Services in Himachal Pradesh</h1>
                    <p className="mt-2 text-lg">Browse through available service providers across the state</p>
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
                                    placeholder="Search services..."
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
                                <button type="submit" className="btn-primary w-full bg-green-600 hover:bg-green-700">
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Advanced Filters */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <select
                                    className="input-field"
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(e.target.value)}
                                >
                                    {ratings.map((rating, index) => (
                                        <option key={index} value={rating}>
                                            {rating}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="btn-secondary w-full md:w-auto"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Services List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader size="large" text="Loading services..." />
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={() => fetchServices()}
                            className="mt-4 btn-primary bg-green-600 hover:bg-green-700"
                        >
                            Try Again
                        </button>
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-medium text-gray-900">No services found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your search filters</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {services.length} {services.length === 1 ? 'Service' : 'Services'} Found
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map(service => (
                                <PostCard
                                    key={service.id}
                                    id={service.id}
                                    title={service.title}
                                    subtitle={service.provider}
                                    location={service.location}
                                    category={service.category}
                                    date={service.postedDate}
                                    rating={service.rating}
                                    type="service"
                                />
                            ))}
                        </div>

                        {/* Pagination - can be implemented later */}
                        <div className="mt-8 flex justify-center">
                            <nav className="inline-flex rounded-md shadow">
                                <a href="#" className="py-2 px-4 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 rounded-l-md">
                                    Previous
                                </a>
                                <a href="#" className="py-2 px-4 bg-green-600 border border-green-600 text-white hover:bg-green-700">
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

export default Services;