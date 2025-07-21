import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Breadcrumbs component for navigation
 */
const Breadcrumbs = ({
    items = [],
    separator = '/',
    className = '',
    ...props
}) => {
    // Base classes
    const baseClasses = 'flex items-center text-sm';

    // Combine all classes
    const breadcrumbsClasses = `${baseClasses} ${className}`;

    return (
        <nav className={breadcrumbsClasses} aria-label="Breadcrumb" {...props}>
            <ol className="flex items-center flex-wrap">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center">
                            {item.href && !isLast ? (
                                <Link
                                    to={item.href}
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={isLast ? 'font-medium text-gray-900' : 'text-gray-500'}>
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <span className="mx-2 text-gray-400">
                                    {separator}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string,
        })
    ).isRequired,
    separator: PropTypes.node,
    className: PropTypes.string,
};

export default Breadcrumbs;