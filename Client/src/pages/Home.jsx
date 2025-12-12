import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import SupportUs from '../components/SupportUs';

const Home = () => {
    const { user } = useAuth();
    const [latestJobs, setLatestJobs] = useState([]);
    const [latestServices, setLatestServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Mock data - replace with API calls
    useEffect(() => {
        // Simulating API fetch
        setLatestJobs([
            {
                id: 1,
                title: 'Software Developer',
                company: 'Tech Solutions',
                location: 'Shimla',
                category: 'IT',
                description: 'Looking for an experienced software developer...',
                postedDate: '2025-07-10',
            },
            {
                id: 2,
                title: 'Hotel Manager',
                company: 'Mountain View Resort',
                location: 'Manali',
                category: 'Hospitality',
                description: 'Experienced hotel manager needed for a luxury resort...',
                postedDate: '2025-07-12',
            },
            {
                id: 3,
                title: 'Tour Guide',
                company: 'Himachal Explorers',
                location: 'Dharamshala',
                category: 'Tourism',
                description: 'Knowledgeable tour guide with excellent communication skills...',
                postedDate: '2025-07-15',
            },
        ]);

        setLatestServices([
            {
                id: 1,
                title: 'Plumbing Services',
                provider: 'Raj Plumbers',
                location: 'Shimla',
                category: 'Plumbing',
                description: 'Professional plumbing services for residential and commercial properties...',
                rating: 4.8,
                postedDate: '2025-07-08',
            },
            {
                id: 2,
                title: 'Electrical Repairs',
                provider: 'Power Solutions',
                location: 'Mandi',
                category: 'Electrical',
                description: 'Certified electrician offering repair and installation services...',
                rating: 4.5,
                postedDate: '2025-07-14',
            },
            {
                id: 3,
                title: 'Tutoring - Mathematics',
                provider: 'Sharma Tutorials',
                location: 'Solan',
                category: 'Education',
                description: 'Experienced tutor for high school and college mathematics...',
                rating: 4.9,
                postedDate: '2025-07-16',
            },
        ]);
    }, []);

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

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className=" text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Connecting Himachal Through Jobs & Services
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Find local jobs or services, or offer your skills to the community across Himachal Pradesh.
                        </p>

                        {/* Search Bar */}
                        <div className="bg-white p-4 rounded-lg shadow-md max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="Search jobs or services..."
                                    className="input-field md:flex-1"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />

                                <select
                                    className="input-field md:w-1/4"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                >
                                    {locations.map((location, index) => (
                                        <option key={index} value={location === 'All Locations' ? '' : location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="input-field md:w-1/4"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category === 'All Categories' ? '' : category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                                <button className="btn-primary md:w-auto">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            {user && (
                <div className="bg-white py-8 border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <p className="text-lg font-medium text-gray-700">
                                Want to contribute to the community?
                            </p>
                            <div className="flex gap-4">
                                <Link to="/create-job" className="btn-primary">
                                    Post a Job
                                </Link>
                                <Link to="/create-service" className="btn-secondary">
                                    Offer a Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Latest Jobs Section */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Latest Jobs</h2>
                        <Link to="/jobs" className="text-primary-600 hover:text-primary-700 font-medium">
                            View All Jobs →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestJobs.map(job => (
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
                </div>
            </div>

            {/* Latest Services Section */}
            <div className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Latest Services</h2>
                        <Link to="/services" className="text-primary-600 hover:text-primary-700 font-medium">
                            View All Services →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestServices.map(service => (
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
                </div>
            </div>

            {/* Categories Section */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Browse by Category
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {categories.slice(1).map((category, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <h3 className="font-medium text-lg text-gray-900">{category}</h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    Find opportunities
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Support Us Section */}
            <div className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SupportUs />
                </div>
            </div>
        </div>
    );
};

export default Home;