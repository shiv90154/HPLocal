import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * NotificationBanner component for displaying important announcements
 */
const NotificationBanner = ({
    message,
    link,
    linkText,
    variant = 'info',
    dismissible = true,
    onDismiss,
    className = '',
    ...props
}) => {
    const [isDismissed, setIsDismissed] = useState(false);

    // Variant styles
    const variantStyles = {
        info: 'bg-primary-50 text-primary-800 border-primary-200',
        success: 'bg-success-50 text-success-700 border-success-200',
        warning: 'bg-warning-50 text-warning-700 border-warning-200',
        error: 'bg-error-50 text-error-700 border-error-200',
        neutral: 'bg-gray-50 text-gray-800 border-gray-200',
        dark: 'bg-gray-800 text-white border-gray-700',
    };

    // Variant icons
    const variantIcons = {
        info: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        success: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        warning: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        error: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        neutral: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        dark: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
        ),
    };

    const handleDismiss = () => {
        setIsDismissed(true);
        if (onDismiss) {
            onDismiss();
        }
    };

    if (isDismissed) {
        return null;
    }

    return (
        <div
            className={`border-t border-b py-3 ${variantStyles[variant]} ${className}`}
            role="alert"
            {...props}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            {variantIcons[variant]}
                        </div>
                        <div className="ml-3 flex items-center flex-wrap">
                            <p className="text-sm font-medium mr-2">
                                {message}
                            </p>
                            {link && (
                                <Link
                                    to={link}
                                    className="text-sm font-medium underline whitespace-nowrap"
                                >
                                    {linkText || 'Learn more'}
                                </Link>
                            )}
                        </div>
                    </div>

                    {dismissible && (
                        <button
                            type="button"
                            className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                            onClick={handleDismiss}
                            aria-label="Dismiss"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

NotificationBanner.propTypes = {
    message: PropTypes.string.isRequired,
    link: PropTypes.string,
    linkText: PropTypes.string,
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'neutral', 'dark']),
    dismissible: PropTypes.bool,
    onDismiss: PropTypes.func,
    className: PropTypes.string,
};

export default NotificationBanner;