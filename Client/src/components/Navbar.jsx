import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [showNotification, setShowNotification] = useState(false)

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    // Show notification randomly (for demo purposes)
    useEffect(() => {
        if (user) {
            const timer = setTimeout(() => {
                setShowNotification(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [user]);

    const handleLogout = () => {
        logout()
        navigate('/')
        setIsMenuOpen(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-primary-800/95 backdrop-blur-md shadow-md'
            : 'bg-primary-800 shadow-lg border-b border-primary-700'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="flex items-center">
                            <span className="text-3xl mr-2 transform group-hover:scale-110 transition-transform duration-300">🏔️</span>
                            <div className="text-2xl font-bold text-stone-300">
                                Himachal Milap
                            </div>
                        </div>
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive('/')
                                ? 'text-primary-700 bg-primary-50'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive('/jobs')
                                ? 'text-primary-700 bg-primary-50'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                }`}
                        >
                            Jobs
                        </Link>
                        <Link
                            to="/services"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive('/services')
                                ? 'text-primary-700 bg-primary-50'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                }`}
                        >
                            Services
                        </Link>

                        {user ? (
                            <>
                                <div className="relative ml-3">
                                    {showNotification && (
                                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                                    )}
                                    <Link
                                        to="/profile"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive('/profile')
                                            ? 'text-primary-700 bg-primary-50'
                                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                            }`}
                                        onClick={() => setShowNotification(false)}
                                    >
                                        <span className="flex items-center">
                                            <span className="mr-1.5">Profile</span>
                                            {user.name && (
                                                <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex items-center space-x-3 ml-4">
                                    <Link
                                        to="/create-job"
                                        className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-sm hover:shadow transition-all duration-200"
                                    >
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                            Post Job
                                        </span>
                                    </Link>
                                    <Link
                                        to="/create-service"
                                        className="px-4 py-2 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow transition-all duration-200"
                                    >
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                            Post Service
                                        </span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-500 hover:text-red-600 font-medium transition-colors p-2 rounded-full hover:bg-gray-100"
                                        aria-label="Logout"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                        </svg>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3 ml-4">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-md text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-sm hover:shadow transition-all duration-200"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-2 pb-3 space-y-1 animate-slide-down">
                    <Link
                        to="/"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/jobs"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/jobs')
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Jobs
                    </Link>
                    <Link
                        to="/services"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/services')
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                            }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Services
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/profile')
                                    ? 'text-primary-700 bg-primary-50'
                                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                    }`}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setShowNotification(false);
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <span>Profile</span>
                                    {showNotification && (
                                        <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                                    )}
                                </div>
                            </Link>
                            <div className="pt-2 pb-1">
                                <div className="border-t border-gray-200 my-1"></div>
                            </div>
                            <Link
                                to="/create-job"
                                className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 my-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Post Job
                                </span>
                            </Link>
                            <Link
                                to="/create-service"
                                className="block px-3 py-2 rounded-md text-base font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 my-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Post Service
                                </span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 mt-2"
                            >
                                <span className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    Logout
                                </span>
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="pt-2 pb-1">
                                <div className="border-t border-gray-200 my-1"></div>
                            </div>
                            <Link
                                to="/login"
                                className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 my-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar