import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Tabs component for organizing content
 */
const Tabs = ({
    tabs = [],
    defaultTab = 0,
    variant = 'default',
    className = '',
    onChange,
    ...props
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabClick = (index) => {
        setActiveTab(index);
        if (onChange) {
            onChange(index);
        }
    };

    // Base classes
    const baseClasses = 'w-full';

    // Variant classes for tab list
    const tabListVariants = {
        default: 'flex border-b border-gray-200',
        pills: 'flex space-x-2',
        boxed: 'flex',
        underline: 'flex',
    };

    // Variant classes for individual tabs
    const tabVariants = {
        default: 'py-3 px-4 text-sm font-medium border-b-2 -mb-px',
        pills: 'py-2 px-4 text-sm font-medium rounded-full',
        boxed: 'py-2 px-4 text-sm font-medium border-t border-l border-r rounded-t-lg',
        underline: 'py-3 px-4 text-sm font-medium border-b-2',
    };

    // Active tab classes
    const activeTabClasses = {
        default: 'border-primary-600 text-primary-600',
        pills: 'bg-primary-600 text-white',
        boxed: 'bg-white border-gray-200 text-gray-900',
        underline: 'border-primary-600 text-primary-600',
    };

    // Inactive tab classes
    const inactiveTabClasses = {
        default: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        pills: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        boxed: 'bg-gray-50 border-transparent text-gray-500 hover:text-gray-700',
        underline: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    };

    // Combine all classes
    const tabsClasses = `${baseClasses} ${className}`;

    return (
        <div className={tabsClasses} {...props}>
            <div className={tabListVariants[variant]} role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`${tabVariants[variant]} ${activeTab === index ? activeTabClasses[variant] : inactiveTabClasses[variant]
                            } transition-all duration-200`}
                        role="tab"
                        aria-selected={activeTab === index}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="py-4">
                {tabs[activeTab]?.content}
            </div>
        </div>
    );
};

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            content: PropTypes.node.isRequired,
        })
    ).isRequired,
    defaultTab: PropTypes.number,
    variant: PropTypes.oneOf(['default', 'pills', 'boxed', 'underline']),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

export default Tabs;