import { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Select component with consistent styling and error handling
 */
const Select = forwardRef(({
    label,
    id,
    options = [],
    error,
    helperText,
    className = '',
    fullWidth = true,
    size = 'md',
    variant = 'default',
    placeholder = 'Select an option',
    ...props
}, ref) => {
    // Generate a unique ID if not provided
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    // Base classes
    const baseSelectClasses = 'border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-800 bg-white transition-all duration-200 appearance-none';

    // Size classes
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5',
        lg: 'px-5 py-3 text-lg',
    };

    // Variant classes
    const variantClasses = {
        default: 'border-gray-300',
        filled: 'bg-gray-50 border-gray-200',
        flushed: 'border-t-0 border-l-0 border-r-0 border-b-2 rounded-none px-0',
        unstyled: 'border-0 px-0 py-0 bg-transparent focus:ring-0',
    };

    // Error classes
    const errorClasses = error ? 'border-error-500 focus:ring-error-500 focus:border-transparent' : '';

    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';

    // Combine all classes
    const selectClasses = `${baseSelectClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${errorClasses} ${widthClasses} ${className}`;

    return (
        <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={selectId}
                    ref={ref}
                    className={selectClasses}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>{placeholder}</option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {(error || helperText) && (
                <p className={`mt-1 text-sm ${error ? 'text-error-600' : 'text-gray-500'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

Select.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
    error: PropTypes.string,
    helperText: PropTypes.string,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['default', 'filled', 'flushed', 'unstyled']),
    placeholder: PropTypes.string,
};

export default Select;