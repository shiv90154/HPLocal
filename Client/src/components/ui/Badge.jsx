import PropTypes from 'prop-types';

/**
 * Badge component for displaying status indicators and tags
 */
const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    dot = false,
    ...props
}) => {
    // Base classes
    const baseClasses = 'inline-flex items-center rounded-full font-medium';

    // Size classes
    const sizeClasses = {
        xs: 'px-1.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
    };

    // Variant classes
    const variantClasses = {
        primary: 'bg-primary-100 text-primary-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-success-50 text-success-700',
        warning: 'bg-warning-50 text-warning-700',
        error: 'bg-error-50 text-error-700',
        accent: 'bg-accent-100 text-accent-800',
        outline: 'bg-white border border-gray-300 text-gray-700',
    };

    // Combine all classes
    const badgeClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    // Dot colors
    const dotColors = {
        primary: 'bg-primary-500',
        secondary: 'bg-gray-500',
        success: 'bg-success-500',
        warning: 'bg-warning-500',
        error: 'bg-error-500',
        accent: 'bg-accent-500',
        outline: 'bg-gray-500',
    };

    return (
        <span className={badgeClasses} {...props}>
            {dot && (
                <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${dotColors[variant]}`}></span>
            )}
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'accent', 'outline']),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    className: PropTypes.string,
    dot: PropTypes.bool,
};

export default Badge;