import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * Alert component for displaying notifications and messages
 */
const Alert = ({
    children,
    variant = 'info',
    title,
    dismissible = false,
    icon,
    className = '',
    ...props
}) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    // Base classes
    const baseClasses = 'rounded-lg p-4 flex';

    // Variant classes
    const variantClasses = {
        info: 'bg-primary-50 text-primary-800 border-l-4 border-primary-500',
        success: 'bg-success-50 text-success-700 border-l-4 border-success-500',
        warning: 'bg-warning-50 text-warning-700 border-l-4 border-warning-500',
        error: 'bg-error-50 text-error-700 border-l-4 border-error-500',
        neutral: 'bg-gray-50 text-gray-800 border-l-4 border-gray-500',
    };

    // Default icons based on variant
    const defaultIcons = {
        info: (
            <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        success: (
            <svg className="h-5 w-5 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        warning: (
            <svg className="h-5 w-5 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        error: (
            <svg className="h-5 w-5 text-error-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        neutral: (
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    // Combine all classes
    const alertClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    // Determine which icon to use
    const alertIcon = icon || defaultIcons[variant];

    return (
        <div className={alertClasses} role="alert" {...props}>
            {alertIcon && (
                <div className="flex-shrink-0 mr-3 mt-0.5">
                    {alertIcon}
                </div>
            )}
            <div className="flex-grow">
                {title && <h3 className="font-medium">{title}</h3>}
                <div className={title ? 'mt-1' : ''}>{children}</div>
            </div>
            {dismissible && (
                <button
                    type="button"
                    className="flex-shrink-0 ml-3 -mt-1 -mr-1 p-1 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    onClick={() => setIsVisible(false)}
                    aria-label="Close"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};

Alert.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'neutral']),
    title: PropTypes.string,
    dismissible: PropTypes.bool,
    icon: PropTypes.node,
    className: PropTypes.string,
};

export default Alert;