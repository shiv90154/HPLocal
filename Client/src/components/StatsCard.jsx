import PropTypes from 'prop-types';
import { Card } from './ui';

/**
 * StatsCard component for displaying statistics
 */
const StatsCard = ({
    value,
    label,
    icon,
    trend,
    trendValue,
    variant = 'default',
    className = '',
    ...props
}) => {
    // Variant styles
    const variantStyles = {
        default: 'bg-white',
        primary: 'bg-primary-50',
        success: 'bg-success-50',
        warning: 'bg-warning-50',
        error: 'bg-error-50',
        accent: 'bg-accent-50',
    };

    // Trend styles
    const trendStyles = {
        up: 'text-success-700',
        down: 'text-error-700',
        neutral: 'text-gray-500',
    };

    // Trend icons
    const trendIcons = {
        up: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        ),
        down: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        ),
        neutral: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
        ),
    };

    return (
        <Card
            className={`${variantStyles[variant]} ${className}`}
            {...props}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>

                    {trend && (
                        <div className={`flex items-center mt-2 ${trendStyles[trend]}`}>
                            {trendIcons[trend]}
                            <span className="ml-1 text-sm font-medium">{trendValue}</span>
                        </div>
                    )}
                </div>

                {icon && (
                    <div className="p-3 rounded-full bg-gray-100">
                        {icon}
                    </div>
                )}
            </div>
        </Card>
    );
};

StatsCard.propTypes = {
    value: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    trend: PropTypes.oneOf(['up', 'down', 'neutral']),
    trendValue: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error', 'accent']),
    className: PropTypes.string,
};

export default StatsCard;