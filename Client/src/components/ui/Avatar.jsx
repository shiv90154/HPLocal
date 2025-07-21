import PropTypes from 'prop-types';

/**
 * Avatar component for displaying user profile images
 */
const Avatar = ({
    src,
    alt = 'User avatar',
    size = 'md',
    variant = 'circle',
    fallback,
    className = '',
    ...props
}) => {
    // Size classes
    const sizeClasses = {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
    };

    // Shape classes
    const variantClasses = {
        circle: 'rounded-full',
        square: 'rounded-md',
        rounded: 'rounded-lg',
    };

    // Generate initials from alt text if no src and no fallback
    const getInitials = () => {
        if (!alt) return '';
        return alt
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    // Combine all classes
    const avatarClasses = `inline-flex items-center justify-center bg-gray-200 text-gray-600 font-medium overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    // If src is provided, render image
    if (src) {
        return (
            <div className={avatarClasses} {...props}>
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div className="hidden items-center justify-center h-full w-full">
                    {fallback || getInitials()}
                </div>
            </div>
        );
    }

    // Otherwise render fallback or initials
    return (
        <div className={avatarClasses} {...props}>
            {fallback || getInitials()}
        </div>
    );
};

Avatar.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
    variant: PropTypes.oneOf(['circle', 'square', 'rounded']),
    fallback: PropTypes.node,
    className: PropTypes.string,
};

export default Avatar;