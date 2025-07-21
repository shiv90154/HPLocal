import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from './ui';

/**
 * FilterSidebar component for filtering search results
 */
const FilterSidebar = ({
    filters = {},
    onApplyFilters,
    onResetFilters,
    className = '',
    ...props
}) => {
    const [activeFilters, setActiveFilters] = useState(filters);
    const [expanded, setExpanded] = useState({});

    // Toggle filter section expansion (for mobile)
    const toggleSection = (section) => {
        setExpanded(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Handle checkbox change
    const handleCheckboxChange = (filterGroup, value) => {
        setActiveFilters(prev => {
            const currentValues = prev[filterGroup] || [];

            // Toggle the value
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];

            return {
                ...prev,
                [filterGroup]: newValues
            };
        });
    };

    // Handle radio change
    const handleRadioChange = (filterGroup, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [filterGroup]: value
        }));
    };

    // Handle range change
    const handleRangeChange = (filterGroup, min, max) => {
        setActiveFilters(prev => ({
            ...prev,
            [filterGroup]: { min, max }
        }));
    };

    // Apply filters
    const handleApplyFilters = () => {
        if (onApplyFilters) {
            onApplyFilters(activeFilters);
        }
    };

    // Reset filters
    const handleResetFilters = () => {
        setActiveFilters({});
        if (onResetFilters) {
            onResetFilters();
        }
    };

    // Render filter section
    const renderFilterSection = (title, filterGroup, options, type = 'checkbox') => {
        const isExpanded = expanded[filterGroup] !== false; // Default to expanded

        return (
            <div className="mb-6">
                <div
                    className="flex justify-between items-center mb-3 cursor-pointer"
                    onClick={() => toggleSection(filterGroup)}
                >
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    <button className="text-gray-500 focus:outline-none">
                        <svg
                            className={`w-5 h-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {isExpanded && (
                    <div className="space-y-2">
                        {type === 'checkbox' && options.map((option) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`${filterGroup}-${option.value}`}
                                    checked={(activeFilters[filterGroup] || []).includes(option.value)}
                                    onChange={() => handleCheckboxChange(filterGroup, option.value)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`${filterGroup}-${option.value}`} className="ml-2 text-sm text-gray-700">
                                    {option.label} {option.count !== undefined && <span className="text-gray-500">({option.count})</span>}
                                </label>
                            </div>
                        ))}

                        {type === 'radio' && options.map((option) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`${filterGroup}-${option.value}`}
                                    name={filterGroup}
                                    checked={activeFilters[filterGroup] === option.value}
                                    onChange={() => handleRadioChange(filterGroup, option.value)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                />
                                <label htmlFor={`${filterGroup}-${option.value}`} className="ml-2 text-sm text-gray-700">
                                    {option.label}
                                </label>
                            </div>
                        ))}

                        {type === 'range' && (
                            <div className="pt-2">
                                <div className="flex items-center justify-between">
                                    <input
                                        type="number"
                                        value={(activeFilters[filterGroup]?.min || options.min || 0)}
                                        onChange={(e) => handleRangeChange(
                                            filterGroup,
                                            parseInt(e.target.value),
                                            activeFilters[filterGroup]?.max || options.max
                                        )}
                                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                                        min={options.min}
                                        max={options.max}
                                    />
                                    <span className="mx-2">to</span>
                                    <input
                                        type="number"
                                        value={(activeFilters[filterGroup]?.max || options.max || 100)}
                                        onChange={(e) => handleRangeChange(
                                            filterGroup,
                                            activeFilters[filterGroup]?.min || options.min,
                                            parseInt(e.target.value)
                                        )}
                                        className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                                        min={options.min}
                                        max={options.max}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <Card className={`${className}`} {...props}>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

                <div className="flex justify-between mb-4">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleResetFilters}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {/* Filter sections */}
            {Object.entries(filters).map(([key, value]) => {
                if (Array.isArray(value.options)) {
                    return renderFilterSection(
                        value.title || key.charAt(0).toUpperCase() + key.slice(1),
                        key,
                        value.options,
                        value.type || 'checkbox'
                    );
                }
                return null;
            })}
        </Card>
    );
};

FilterSidebar.propTypes = {
    filters: PropTypes.object,
    onApplyFilters: PropTypes.func,
    onResetFilters: PropTypes.func,
    className: PropTypes.string,
};

export default FilterSidebar;