import PropTypes from 'prop-types';
import { Card } from './ui';

/**
 * FeatureCard component for displaying features and benefits
 */
const FeatureCard = ({
    title,
    description,
    icon,
    variant = 'default',
    className = '',
    ...props
}) => {
    // Icon background styles based on variant
    const iconBgStyles = {
        default: 'bg-primary-100 text-primary-600',
        primary: 'bg-primary-600 text-white',
        secondary: 'bg-gray-100 text-gray-700',
        accent: 'bg-accent-100 text-accent-600',
        success: 'bg-success-50 text-success-700',
    };

    return (
        <Card
            className={`h-full ${className}`}
            hover
            {...props}
        >
            <div className="flex flex-col h-full">
                <div className={`p-3 rounded-lg inline-flex items-center justify-center mb-4 ${iconBgStyles[variant]}`}>
                    {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 flex-grow">{description}</p>
            </div>
        </Card>
    );
};

FeatureCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent', 'success']),
    className: PropTypes.string,
};

export default FeatureCard;