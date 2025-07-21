import PropTypes from 'prop-types';

/**
 * Skeleton component for loading states
 */
const Skeleton = ({
    variant = 'rectangle',
    width,
    height,
    className = '',
    ...props
}) => {
    // Base classes
    const baseClasses = 'animate-pulse bg-gray-200';

    // Variant classes
    const variantClasses = {
        rectangle: 'rounded',
        circle: 'rounded-full',
        text: 'rounded h-4',
    };

    // Width and height styles
    const style = {
        width: width,
        height: height,
    };

    // Combine all classes
    const skeletonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return <div className={skeletonClasses} style={style} {...props} />;
};

Skeleton.propTypes = {
    variant: PropTypes.oneOf(['rectangle', 'circle', 'text']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
};

/**
 * Skeleton Text component for loading text content
 */
export const SkeletonText = ({
    lines = 3,
    lastLineWidth = '75%',
    spacing = 'tight',
    className = '',
    ...props
}) => {
    // Spacing classes
    const spacingClasses = {
        tight: 'space-y-1',
        normal: 'space-y-2',
        loose: 'space-y-3',
    };

    return (
        <div className={`${spacingClasses[spacing]} ${className}`} {...props}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="text"
                    width={index === lines - 1 && lastLineWidth ? lastLineWidth : '100%'}
                />
            ))}
        </div>
    );
};

SkeletonText.propTypes = {
    lines: PropTypes.number,
    lastLineWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    spacing: PropTypes.oneOf(['tight', 'normal', 'loose']),
    className: PropTypes.string,
};

export default Skeleton;