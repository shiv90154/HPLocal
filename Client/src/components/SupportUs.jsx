import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const SupportUs = ({ showInFooter = false }) => {
    const [selectedAmount, setSelectedAmount] = useState('100');
    const [showQR, setShowQR] = useState(false);

    const donationAmounts = [
        { value: '50', label: '₹50' },
        { value: '100', label: '₹100' },
        { value: '200', label: '₹200' },
        { value: 'custom', label: 'Custom' }
    ];

    const testimonials = [
        {
            quote: "Thanks to Himachal Milap, I found a tutoring job within a week! This platform is a blessing for our community.",
            author: "Rahul Sharma, Shimla"
        },
        {
            quote: "I was struggling to find a plumber in my area. Posted on Himachal Milap and got responses within hours!",
            author: "Priya Thakur, Manali"
        },
        {
            quote: "As a small business owner, finding local talent was challenging until I discovered this platform. Thank you!",
            author: "Vikram Singh, Dharamshala"
        }
    ];

    const handleDonateClick = () => {
        setShowQR(true);
        toast.success('Thank you for your interest in supporting us!');
    };

    // Randomly select a testimonial
    const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];

    if (showInFooter) {
        return (
            <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-primary-700 mb-2">Support Our Platform</h3>
                <p className="text-sm text-gray-600 mb-3">
                    Your contribution helps us maintain and improve Himachal Milap.
                </p>
                <button
                    onClick={handleDonateClick}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-1 px-3 rounded-lg text-sm"
                >
                    Donate Now
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-sm">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Himachal Milap</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Help us continue connecting the Himachal community through jobs and services.
                        Your contribution directly supports our server costs, domain maintenance, and development efforts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                            <p className="italic text-gray-700 mb-3">"{randomTestimonial.quote}"</p>
                            <p className="text-right text-sm font-medium text-gray-600">— {randomTestimonial.author}</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">Select an amount</h3>

                            <div className="flex flex-wrap gap-3">
                                {donationAmounts.map((amount) => (
                                    <button
                                        key={amount.value}
                                        className={`px-6 py-2 rounded-full border-2 transition-colors ${selectedAmount === amount.value
                                            ? 'border-primary-600 bg-primary-600 text-white'
                                            : 'border-gray-300 hover:border-primary-600 text-gray-700'
                                            }`}
                                        onClick={() => setSelectedAmount(amount.value)}
                                    >
                                        {amount.label}
                                    </button>
                                ))}
                            </div>

                            {selectedAmount === 'custom' && (
                                <div className="mt-3">
                                    <label htmlFor="customAmount" className="sr-only">Custom amount</label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                            ₹
                                        </span>
                                        <input
                                            type="number"
                                            id="customAmount"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-800 bg-white"
                                            placeholder="Enter amount"
                                            min="10"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    onClick={handleDonateClick}
                                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-5 rounded-lg w-full text-lg"
                                >
                                    Donate Now
                                </button>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    100% of your donation goes towards maintaining this community platform
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <h4 className="font-medium text-blue-800 mb-2">How your support helps:</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Server and hosting costs
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Domain name renewal
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    New features development
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Coffee for our developers!
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="bg-primary-50 p-6 rounded-lg">
                            <div className="h-64 flex items-center justify-center">
                                <svg className="w-32 h-32 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="mt-4 text-gray-600">
                                Your support helps us connect more people across Himachal Pradesh
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SupportUs.propTypes = {
    showInFooter: PropTypes.bool
};

export default SupportUs;