import PropTypes from 'prop-types';

/**
 * Card component with various styles and options
 */
const Card = ({
    children,
    className = '',
    hover = false,
    padding = 'default',
    shadow = 'default',
    border = true,
    variant = 'default',
    as = 'div',
    onClick,
    header,
    footer,
    ...props
}) => {
    // Base classes
    const baseClasses = 'rounded-xl transition-all duration-300';

    // Variant classes
    const variantClasses = {
        default: 'bg-white',
        primary: 'bg-primary-50',
        secondary: 'bg-gray-50',
        accent: 'bg-accent-50',
        gradient: 'bg-gradient-to-br from-primary-50 to-white',
        transparent: 'bg-transparent',
    };

    // Hover effect
    const hoverClasses = hover ? 'hover:border-primary-200 hover:-translate-y-1 card-hover' : '';

    // Padding classes
    const paddingClasses = {
        none: '',
        sm: header || footer ? '' : 'p-3',
        default: header || footer ? '' : 'p-6',
        lg: header || footer ? '' : 'p-8',
    };

    // Shadow classes
    const shadowClasses = {
        none: '',
        default: 'shadow-card hover:shadow-card-hover',
        lg: 'shadow-lg hover:shadow-xl',
        soft: 'shadow-soft',
    };

    // Border classes
    const borderClasses = border ? 'border border-gray-100' : '';

    // Interactive classes
    const interactiveClasses = onClick ? 'cursor-pointer' : '';

    // Combine all classes
    const cardClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClasses} ${hoverClasses} ${interactiveClasses} ${className}`;

    // Determine the component to render
    const Component = as;

    // Padding classes for header and footer
    const headerPaddingClasses = {
        none: 'px-0 py-0',
        sm: 'px-3 py-2',
        default: 'px-6 py-4',
        lg: 'px-8 py-5',
    };

    const bodyPaddingClasses = {
        none: 'px-0 py-0',
        sm: 'px-3 py-2',
        default: 'px-6 py-4',
        lg: 'px-8 py-6',
    };

    const footerPaddingClasses = {
        none: 'px-0 py-0',
        sm: 'px-3 py-2',
        default: 'px-6 py-4',
        lg: 'px-8 py-5',
    };

    return (
        <Component className={cardClasses} onClick={onClick} {...props}>
            {header && (
                <div className={`border-b border-gray-100 ${headerPaddingClasses[padding]}`}>
                    {header}
                </div>
            )}

            <div className={header || footer ? bodyPaddingClasses[padding] : ''}>
                {children}
            </div>

            {footer && (
                <div className={`border-t border-gray-100 ${footerPaddingClasses[padding]}`}>
                    {footer}
                </div>
            )}
        </Component>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    hover: PropTypes.bool,
    padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg']),
    shadow: PropTypes.oneOf(['none', 'default', 'lg', 'soft']),
    border: PropTypes.bool,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent', 'gradient', 'transparent']),
    as: PropTypes.elementType,
    onClick: PropTypes.func,
    header: PropTypes.node,
    footer: PropTypes.node,
};

export default Card;