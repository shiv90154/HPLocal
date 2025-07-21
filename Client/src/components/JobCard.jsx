import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Badge, Button } from './ui';

/**
 * JobCard component for displaying job listings
 */
const JobCard = ({
    id,
    title,
    company,
    location,
    salary,
    type,
    category,
    postedDate,
    deadline,
    description,
    featured = false,
    className = '',
    ...props
}) => {
    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Calculate days ago
    const calculateDaysAgo = (dateString) => {
        const postedDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - postedDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else {
            return `${diffDays} days ago`;
        }
    };

    // Job type badge variant
    const getTypeVariant = (type) => {
        switch (type.toLowerCase()) {
            case 'full-time':
                return 'primary';
            case 'part-time':
                return 'success';
            case 'contract':
                return 'warning';
            case 'freelance':
                return 'accent';
            default:
                return 'secondary';
        }
    };

    return (
        <Card
            className={`${featured ? 'border-primary-300 bg-primary-50' : ''} ${className}`}
            hover
            {...props}
        >
            {featured && (
                <div className="absolute -top-2 -right-2">
                    <Badge variant="primary" size="sm" className="shadow-sm">
                        Featured
                    </Badge>
                </div>
            )}

            <div className="flex flex-col h-full">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">
                            <Link to={`/job/${id}`} className="text-gray-900 hover:text-primary-600 transition-colors">
                                {title}
                            </Link>
                        </h3>
                        <Badge variant={getTypeVariant(type)}>
                            {type}
                        </Badge>
                    </div>

                    <div className="text-gray-600 mb-2">
                        <span className="font-medium">{company}</span>
                        {location && (
                            <span className="flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {location}
                            </span>
                        )}
                    </div>

                    {salary && (
                        <div className="flex items-center text-gray-700 mb-2">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {salary}
                        </div>
                    )}

                    {description && (
                        <p className="text-gray-600 mt-3 line-clamp-2">{description}</p>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between">
                    <div className="text-sm text-gray-500">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Posted {calculateDaysAgo(postedDate)}
                        </span>

                        {deadline && (
                            <span className="flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Apply by {formatDate(deadline)}
                            </span>
                        )}
                    </div>

                    <Button
                        to={`/job/${id}`}
                        variant="outline"
                        size="sm"
                        className="mt-2 sm:mt-0"
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </Card>
    );
};

JobCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string,
    salary: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    postedDate: PropTypes.string.isRequired,
    deadline: PropTypes.string,
    description: PropTypes.string,
    featured: PropTypes.bool,
    className: PropTypes.string,
};

export default JobCard;