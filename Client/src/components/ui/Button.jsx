import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Button component with various styles and sizes
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    fullWidth = false,
    isLoading = false,
    leftIcon = null,
    rightIcon = null,
    href = null,
    to = null,
    disabled = false,
    type = 'button',
    ...props
}) => {
    // Base classes
    const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Size classes
    const sizeClasses = {
        xs: 'py-1 px-2 text-xs',
        sm: 'py-1.5 px-3 text-sm',
        md: 'py-2.5 px-5',
        lg: 'py-3 px-6 text-lg',
    };

    // Variant classes
    const variantClasses = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow focus:ring-primary-500',
        secondary: 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow focus:ring-gray-500',
        outline: 'bg-transparent hover:bg-primary-50 text-primary-600 border border-primary-600 hover:border-primary-700 focus:ring-primary-500',
        accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-sm hover:shadow focus:ring-accent-500',
        danger: 'bg-error-500 hover:bg-error-600 text-white shadow-sm hover:shadow focus:ring-error-500',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
        link: 'bg-transparent text-primary-600 hover:text-primary-700 hover:underline p-0 focus:ring-0',
    };

    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';

    // Combine all classes
    const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${className}`;

    // Loading spinner
    const LoadingSpinner = () => (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );

    // Render as Link if 'to' prop is provided (for react-router)
    if (to) {
        return (
            <Link
                to={to}
                className={buttonClasses}
                {...props}
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner />
                        <span>{props.loadingText || 'Loading...'}</span>
                    </>
                ) : (
                    <>
                        {leftIcon && <span className="icon-left">{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className="icon-right">{rightIcon}</span>}
                    </>
                )}
            </Link>
        );
    }

    // Render as anchor if 'href' prop is provided
    if (href) {
        return (
            <a
                href={href}
                className={buttonClasses}
                {...props}
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner />
                        <span>{props.loadingText || 'Loading...'}</span>
                    </>
                ) : (
                    <>
                        {leftIcon && <span className="icon-left">{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className="icon-right">{rightIcon}</span>}
                    </>
                )}
            </a>
        );
    }

    // Otherwise render as button
    return (
        <button
            className={buttonClasses}
            disabled={isLoading || disabled}
            type={type}
            {...props}
        >
            {isLoading ? (
                <>
                    <LoadingSpinner />
                    <span>{props.loadingText || 'Loading...'}</span>
                </>
            ) : (
                <>
                    {leftIcon && <span className="icon-left">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="icon-right">{rightIcon}</span>}
                </>
            )}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'accent', 'danger', 'ghost', 'link']),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    isLoading: PropTypes.bool,
    loadingText: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    href: PropTypes.string,
    to: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
};

export default Button;