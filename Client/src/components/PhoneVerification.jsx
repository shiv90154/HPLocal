import { useState } from 'react';
import PropTypes from 'prop-types';
import { setupRecaptcha } from '../services/firebase';
import { toast } from 'react-toastify';

const PhoneVerification = ({ phone, onVerificationSuccess, onCancel }) => {
    const [verificationId, setVerificationId] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    // Format phone number to E.164 format for Firebase
    const formatPhoneNumber = (phoneNumber) => {
        // Remove any non-digit characters
        const digits = phoneNumber.replace(/\D/g, '');

        // Check if the number already has a country code
        if (digits.startsWith('91') && digits.length === 12) {
            return `+${digits}`;
        }

        // Add India country code if not present
        return `+91${digits}`;
    };

    const sendOTP = async () => {
        if (!phone) {
            toast.error('Please enter a valid phone number');
            return;
        }

        try {
            setIsSendingOtp(true);
            const formattedPhone = formatPhoneNumber(phone);
            const confirmationResult = await setupRecaptcha(formattedPhone);
            setVerificationId(confirmationResult.verificationId);
            setOtpSent(true);
            toast.success('OTP sent successfully!');
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error(error.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const verifyOTP = async () => {
        if (!otp) {
            toast.error('Please enter the OTP');
            return;
        }

        try {
            setIsLoading(true);
            await confirmationResult.confirm(otp);
            toast.success('Phone number verified successfully!');
            onVerificationSuccess();
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error(error.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Phone Verification</h2>

            {!otpSent ? (
                <div className="space-y-4">
                    <p className="text-gray-600">
                        We need to verify your phone number before you can proceed. An OTP will be sent to:
                    </p>
                    <p className="font-medium text-gray-800">{phone}</p>

                    {/* Hidden reCAPTCHA container */}
                    <div id="recaptcha-container"></div>

                    <div className="flex space-x-3">
                        <button
                            onClick={sendOTP}
                            disabled={isSendingOtp}
                            className="btn-primary flex items-center"
                        >
                            {isSendingOtp ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending OTP...
                                </>
                            ) : (
                                'Send OTP'
                            )}
                        </button>
                        <button
                            onClick={onCancel}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Enter the 6-digit code sent to your phone:
                    </p>

                    <div>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="input-field"
                            maxLength={6}
                        />
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={verifyOTP}
                            disabled={isLoading}
                            className="btn-primary flex items-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </>
                            ) : (
                                'Verify OTP'
                            )}
                        </button>
                        <button
                            onClick={sendOTP}
                            disabled={isSendingOtp}
                            className="btn-secondary flex items-center"
                        >
                            {isSendingOtp ? 'Resending...' : 'Resend OTP'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

PhoneVerification.propTypes = {
    phone: PropTypes.string.isRequired,
    onVerificationSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default PhoneVerification;