import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from './ui';

/**
 * EmptyState component for displaying empty states
 */
const EmptyState = ({
    title = 'No results found',
    description = 'We couldn\'t find any results matching your search criteria.',
    icon,
    action,
    actionLink,
    actionText = 'Try Again',
    secondaryAction,
    secondaryActionText,
    secondaryActionLink,
    variant = 'default',
    className = '',
    ...props
}) => {
    // Default icon if none provided
    const defaultIcons = {
        default: (
            <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        search: (
            <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        error: (
            <svg className="h-16 w-16 text-error-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        empty: (
            <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
        )
    };

    // Use provided icon or default based on variant
    const displayIcon = icon || defaultIcons[variant] || defaultIcons.default;

    // Variant styles
    const variantStyles = {
        default: "bg-gray-100",
        primary: "bg-primary-100",
        error: "bg-error-50",
        warning: "bg-warning-50",
        success: "bg-success-50"
    };

    const iconBgClass = variantStyles[variant] || variantStyles.default;

    return (
        <div className={`text-center py-16 px-4 animate-fade-in ${className}`} {...props}>
            <div className={`inline-flex items-center justify-center p-6 ${iconBgClass} rounded-full mb-6 shadow-sm`}>
                {displayIcon}
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-8 text-lg">{description}</p>

            <div className="flex flex-wrap justify-center gap-4">
                {action && (
                    <Button onClick={action} variant="primary" size="lg">
                        {actionText}
                    </Button>
                )}

                {actionLink && (
                    <Link to={actionLink}>
                        <Button variant="primary" size="lg">
                            {actionText}
                        </Button>
                    </Link>
                )}

                {secondaryAction && (
                    <Button onClick={secondaryAction} variant="secondary" size="lg">
                        {secondaryActionText}
                    </Button>
                )}

                {secondaryActionLink && (
                    <Link to={secondaryActionLink}>
                        <Button variant="secondary" size="lg">
                            {secondaryActionText}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

EmptyState.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.node,
    action: PropTypes.func,
    actionLink: PropTypes.string,
    actionText: PropTypes.string,
    secondaryAction: PropTypes.func,
    secondaryActionText: PropTypes.string,
    secondaryActionLink: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'primary', 'error', 'warning', 'success', 'search', 'empty']),
    className: PropTypes.string,
};

export default EmptyState;