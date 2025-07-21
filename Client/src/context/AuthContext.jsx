import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in (from localStorage)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const userData = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    token: data.token
                };

                // Store user in localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                return { success: true };
            } else {
                return {
                    success: false,
                    error: data.error || 'Failed to login'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to login'
            };
        }
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const userData = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    token: data.token
                };

                // Store user in localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                return { success: true };
            } else {
                return {
                    success: false,
                    error: data.error || 'Failed to register'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to register'
            };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // Update user profile
    const updateProfile = async (userData) => {
        try {
            if (!user || !user.token) {
                return {
                    success: false,
                    error: 'User not authenticated'
                };
            }

            const response = await fetch('http://localhost:5000/api/auth/updatedetails', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                const updatedUser = {
                    ...user,
                    ...userData,
                    // Keep the token from the current user
                    token: user.token
                };

                // Update localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                return { success: true };
            } else {
                return {
                    success: false,
                    error: data.error || 'Failed to update profile'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to update profile'
            };
        }
    };

    // Verify phone number
    const verifyPhone = async (phone) => {
        try {
            if (!user || !user.token) {
                return {
                    success: false,
                    error: 'User not authenticated'
                };
            }

            const response = await fetch('http://localhost:5000/api/auth/verify-phone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ phone, isVerified: true }),
            });

            const data = await response.json();

            if (response.ok) {
                const updatedUser = {
                    ...user,
                    phone,
                    isPhoneVerified: true
                };

                // Update localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                return { success: true };
            } else {
                return {
                    success: false,
                    error: data.error || 'Failed to verify phone number'
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to verify phone number'
            };
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        verifyPhone
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};