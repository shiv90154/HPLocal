import { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Textarea component with consistent styling and error handling
 */
const Textarea = forwardRef(({
    label,
    id,
    error,
    helperText,
    className = '',
    fullWidth = true,
    size = 'md',
    variant = 'default',
    rows = 4,
    ...props
}, ref) => {
    // Generate a unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    // Base classes
    const baseTextareaClasses = 'border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-800 bg-white transition-all duration-200';

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
    const textareaClasses = `${baseTextareaClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${errorClasses} ${widthClasses} ${className}`;

    return (
        <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
            {label && (
                <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                ref={ref}
                rows={rows}
                className={textareaClasses}
                {...props}
            />
            {(error || helperText) && (
                <p className={`mt-1 text-sm ${error ? 'text-error-600' : 'text-gray-500'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.string,
    helperText: PropTypes.string,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['default', 'filled', 'flushed', 'unstyled']),
    rows: PropTypes.number,
};

export default Textarea;