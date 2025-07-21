import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import PhoneVerificationRequired from '../components/PhoneVerificationRequired';

const ProtectedRoute = ({ children, requirePhoneVerification = true }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader size="large" text="Authenticating..." />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If phone verification is required and user's phone is not verified
    if (requirePhoneVerification && !user.isPhoneVerified) {
        return <PhoneVerificationRequired>{children}</PhoneVerificationRequired>;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    requirePhoneVerification: PropTypes.bool
};

export default ProtectedRoute;