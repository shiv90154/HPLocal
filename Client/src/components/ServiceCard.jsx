import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Badge, Button, Avatar } from './ui';

/**
 * ServiceCard component for displaying service listings
 */
const ServiceCard = ({
    id,
    title,
    provider,
    providerAvatar,
    location,
    price,
    category,
    rating,
    reviewCount,
    postedDate,
    image,
    featured = false,
    className = '',
    ...props
}) => {
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

    // Render stars for rating
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`star-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // Half star
        if (hasHalfStar) {
            stars.push(
                <svg key="half-star" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // Empty stars
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        return stars;
    };

    return (
        <Card
            className={`${featured ? 'border-primary-300' : ''} ${className} overflow-hidden`}
            padding="none"
            hover
            {...props}
        >
            {/* Service image */}
            <div className="relative">
                <Link to={`/service/${id}`}>
                    <img
                        src={image || 'https://via.placeholder.com/400x200?text=Service'}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                </Link>

                {featured && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="primary" size="sm" className="shadow-sm">
                            Featured
                        </Badge>
                    </div>
                )}

                {category && (
                    <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" size="sm" className="bg-white/90 shadow-sm">
                            {category}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Service content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                    <Link to={`/service/${id}`} className="text-gray-900 hover:text-primary-600 transition-colors">
                        {title}
                    </Link>
                </h3>

                <div className="flex items-center mb-3">
                    <Avatar
                        src={providerAvatar}
                        alt={provider}
                        size="sm"
                        className="mr-2"
                    />
                    <span className="text-sm font-medium">{provider}</span>
                </div>

                {location && (
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {location}
                    </div>
                )}

                {/* Rating */}
                {rating && (
                    <div className="flex items-center mb-3">
                        <div className="flex mr-1">
                            {renderStars()}
                        </div>
                        <span className="text-sm text-gray-600">
                            ({reviewCount || 0} {reviewCount === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-4 flex items-center justify-between">
                <div className="font-bold text-lg text-primary-600">
                    {price}
                </div>

                <Button
                    to={`/service/${id}`}
                    variant="primary"
                    size="sm"
                >
                    View Details
                </Button>
            </div>
        </Card>
    );
};

ServiceCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    providerAvatar: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.string.isRequired,
    category: PropTypes.string,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    postedDate: PropTypes.string,
    image: PropTypes.string,
    featured: PropTypes.bool,
    className: PropTypes.string,
};

export default ServiceCard;