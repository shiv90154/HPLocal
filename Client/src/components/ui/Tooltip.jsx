import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Tooltip component for displaying additional information
 */
const Tooltip = ({
    children,
    content,
    position = 'top',
    delay = 300,
    className = '',
    ...props
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    // Position classes
    const positionClasses = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2',
        left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2',
        right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2',
    };

    // Arrow classes
    const arrowClasses = {
        top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent',
        left: 'right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent',
        right: 'left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent',
    };

    // Show tooltip with delay
    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    // Hide tooltip immediately
    const hideTooltip = () => {
        clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip} {...props}>
            {children}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded shadow-sm whitespace-nowrap ${positionClasses[position]} ${className}`}
                >
                    {content}
                    <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
                </div>
            )}
        </div>
    );
};

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    delay: PropTypes.number,
    className: PropTypes.string,
};

export default Tooltip;