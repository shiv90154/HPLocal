import PropTypes from 'prop-types';

/**
 * Loader component for displaying loading states
 */
const Loader = ({
    size = 'md',
    variant = 'primary',
    fullPage = false,
    text = 'Loading...',
    className = '',
    ...props
}) => {
    // Size classes for the spinner
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    // Color classes for the spinner
    const colorClasses = {
        primary: 'text-primary-600',
        white: 'text-white',
        gray: 'text-gray-600',
    };

    // Use Tailwind's animate-spin class
    const spinnerClasses = `${sizeClasses[size]} ${colorClasses[variant]} ${className} animate-spin`;

    // If fullPage is true, render a centered loader that takes up the full page/container
    if (fullPage) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]" {...props}>
                <svg className={spinnerClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {text && <p className="mt-4 text-gray-600 font-medium">{text}</p>}
            </div>
        );
    }

    // Otherwise, render just the spinner
    return (
        <svg className={spinnerClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );
};

Loader.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    variant: PropTypes.oneOf(['primary', 'white', 'gray']),
    fullPage: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
};

export default Loader;