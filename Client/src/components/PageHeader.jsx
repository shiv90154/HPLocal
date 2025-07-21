import PropTypes from 'prop-types';

/**
 * PageHeader component for consistent page header styling
 */
const PageHeader = ({
    title,
    subtitle,
    actions,
    breadcrumbs,
    className = '',
    bgGradient = false,
    centered = false,
    ...props
}) => {
    // Base classes
    const baseClasses = 'py-8 md:py-12 px-4 sm:px-6 lg:px-8';

    // Background classes
    const bgClasses = bgGradient
        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
        : 'bg-white border-b border-gray-200';

    // Text alignment classes
    const alignmentClasses = centered ? 'text-center' : '';

    // Combine all classes
    const headerClasses = `${baseClasses} ${bgClasses} ${alignmentClasses} ${className}`;

    return (
        <div className={headerClasses} {...props}>
            <div className="max-w-7xl mx-auto">
                {breadcrumbs && (
                    <div className={`mb-4 ${bgGradient ? 'text-white/80' : 'text-gray-500'}`}>
                        {breadcrumbs}
                    </div>
                )}

                <div className={`flex flex-col ${!centered && 'md:flex-row md:items-center md:justify-between'}`}>
                    <div className={`${centered ? 'mx-auto max-w-2xl' : ''}`}>
                        <h1 className={`text-3xl font-bold tracking-tight ${bgGradient ? 'text-white' : 'text-gray-900'} sm:text-4xl`}>
                            {title}
                        </h1>
                        {subtitle && (
                            <p className={`mt-2 text-lg ${bgGradient ? 'text-white/90' : 'text-gray-600'}`}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {actions && (
                        <div className={`mt-4 md:mt-0 flex flex-wrap gap-3 ${centered ? 'justify-center' : 'justify-start md:justify-end'}`}>
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

PageHeader.propTypes = {
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node,
    actions: PropTypes.node,
    breadcrumbs: PropTypes.node,
    className: PropTypes.string,
    bgGradient: PropTypes.bool,
    centered: PropTypes.bool,
};

export default PageHeader;