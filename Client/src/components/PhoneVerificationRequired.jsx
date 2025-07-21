import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Button, Card, Input, Alert } from './ui';

const PhoneVerificationRequired = ({ children }) => {
    const { user, verifyPhone } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If user is already phone verified, render children
    if (user?.isPhoneVerified) {
        return children;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phoneNumber.trim() || phoneNumber.length < 10) {
            toast.error('Please enter a valid 10-digit phone number');
            return;
        }

        try {
            setIsSubmitting(true);

            // Update user's phone number in our backend
            // In a real app, you might want to add additional verification steps here
            const result = await verifyPhone(phoneNumber);

            if (result.success) {
                toast.success('Phone number saved successfully!');
                // The user object in context will be updated by verifyPhone function
            } else {
                toast.error(result.error || 'Failed to save phone number');
            }
        } catch (error) {
            console.error('Error saving phone number:', error);
            toast.error(error.message || 'Failed to save phone number. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <Card
                className="max-w-md w-full animate-fade-in overflow-hidden"
                shadow="lg"
                padding="none"
            >
                {/* Header with illustration */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center">Phone Verification</h2>
                    <p className="mt-2 text-center text-white/80">
                        To continue using Himachal Milap, please verify your phone number
                    </p>
                </div>

                {/* Form content */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-group">
                            <Input
                                label="Phone Number"
                                id="phone"
                                name="phone"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your 10-digit phone number"
                                pattern="[0-9]{10}"
                                maxLength="10"
                                required
                                leftIcon={
                                    <span className="font-medium text-gray-600">+91</span>
                                }
                                helperText="We'll use this number to contact you about your posts and verify your account"
                            />
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                isLoading={isSubmitting}
                                loadingText="Verifying..."
                                rightIcon={
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                }
                            >
                                Verify and Continue
                            </Button>
                        </div>
                    </form>

                    {/* Security note */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Alert
                            variant="info"
                            icon={
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                        >
                            Your information is secure and will not be shared
                        </Alert>
                    </div>
                </div>
            </Card>
        </div>
    );
};

PhoneVerificationRequired.propTypes = {
    children: PropTypes.node.isRequired
};

export default PhoneVerificationRequired;