import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui';

/**
 * Modal component for displaying dialogs
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    closeOnOverlayClick = true,
    showCloseButton = true,
    className = '',
    ...props
}) => {
    const modalRef = useRef(null);

    // Handle escape key press to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Handle click outside modal to close
    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target) && closeOnOverlayClick) {
            onClose();
        }
    };

    // Prevent scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // If modal is not open, don't render anything
    if (!isOpen) return null;

    // Size classes
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4',
    };

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4"
            onClick={handleOverlayClick}
            aria-modal="true"
            role="dialog"
            {...props}
        >
            <div
                ref={modalRef}
                className={`bg-white rounded-xl shadow-xl transform transition-all w-full ${sizeClasses[size]} ${className}`}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    {showCloseButton && (
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Body */}
                <div className="px-6 py-4">{children}</div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-gray-200 flex flex-row-reverse gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
    closeOnOverlayClick: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    className: PropTypes.string,
};

// Predefined modal footer with cancel and confirm buttons
export const ModalFooter = ({
    onCancel,
    onConfirm,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    confirmVariant = 'primary',
    isConfirmLoading = false,
    isConfirmDisabled = false,
}) => {
    return (
        <>
            <Button
                variant={confirmVariant}
                onClick={onConfirm}
                isLoading={isConfirmLoading}
                disabled={isConfirmDisabled}
            >
                {confirmText}
            </Button>
            <Button variant="secondary" onClick={onCancel}>
                {cancelText}
            </Button>
        </>
    );
};

ModalFooter.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    confirmVariant: PropTypes.string,
    isConfirmLoading: PropTypes.bool,
    isConfirmDisabled: PropTypes.bool,
};

export default Modal;