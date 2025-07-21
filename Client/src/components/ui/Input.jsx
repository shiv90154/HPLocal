import { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Input component with consistent styling and error handling
 */
const Input = forwardRef(({
    label,
    id,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className = '',
    fullWidth = true,
    size = 'md',
    variant = 'default',
    ...props
}, ref) => {
    // Generate a unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    // Base classes
    const baseInputClasses = 'border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-800 bg-white transition-all duration-200';

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

    // Icon padding classes
    const leftPaddingClass = leftIcon ? 'pl-10' : '';
    const rightPaddingClass = rightIcon ? 'pr-10' : '';

    // Combine all classes
    const inputClasses = `${baseInputClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${errorClasses} ${widthClasses} ${leftPaddingClass} ${rightPaddingClass} ${className}`;

    return (
        <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        {leftIcon}
                    </div>
                )}
                <input
                    id={inputId}
                    ref={ref}
                    className={inputClasses}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                        {rightIcon}
                    </div>
                )}
            </div>
            {(error || helperText) && (
                <p className={`mt-1 text-sm ${error ? 'text-error-600' : 'text-gray-500'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    error: PropTypes.string,
    helperText: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['default', 'filled', 'flushed', 'unstyled']),
};

export default Input;