import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Avatar, Badge, Button } from './ui';

/**
 * ProfileCard component for displaying user profiles
 */
const ProfileCard = ({
    user = {},
    variant = 'default',
    showActions = true,
    className = '',
    ...props
}) => {
    // Variant styles
    const variantStyles = {
        default: '',
        compact: 'p-4',
        detailed: '',
    };

    return (
        <Card
            className={`${variantStyles[variant]} ${className}`}
            {...props}
        >
            <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size={variant === 'compact' ? 'lg' : 'xl'}
                    className="mb-4"
                />

                {/* User info */}
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{user.name}</h3>

                {user.title && (
                    <p className="text-gray-600 mb-2">{user.title}</p>
                )}

                {user.location && (
                    <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {user.location}
                    </div>
                )}

                {/* Badges/Tags */}
                {user.tags && user.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {user.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" size="sm">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Bio */}
                {variant === 'detailed' && user.bio && (
                    <p className="text-gray-600 mb-4">{user.bio}</p>
                )}

                {/* Stats */}
                {variant === 'detailed' && user.stats && (
                    <div className="grid grid-cols-3 gap-4 w-full mb-4">
                        {Object.entries(user.stats).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <div className="text-xl font-bold text-gray-900">{value}</div>
                                <div className="text-xs text-gray-500">{key}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Actions */}
                {showActions && (
                    <div className="mt-4 flex flex-col sm:flex-row gap-2 w-full">
                        {user.id && (
                            <Button
                                to={`/profile/${user.id}`}
                                variant="outline"
                                fullWidth
                            >
                                View Profile
                            </Button>
                        )}

                        {user.contactable !== false && (
                            <Button
                                variant="primary"
                                fullWidth
                            >
                                Contact
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

ProfileCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        title: PropTypes.string,
        location: PropTypes.string,
        bio: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        stats: PropTypes.object,
        contactable: PropTypes.bool,
    }),
    variant: PropTypes.oneOf(['default', 'compact', 'detailed']),
    showActions: PropTypes.bool,
    className: PropTypes.string,
};

export default ProfileCard;