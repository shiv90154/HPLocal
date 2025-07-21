import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoutes';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Services from './pages/Services';
import JobDetail from './pages/JobDetail';
import ServiceDetail from './pages/ServiceDetail';
import CreateJob from './pages/CreateJob';
import CreateService from './pages/CreateService';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import TestPage from './pages/TestPage';
import SimpleTest from './pages/SimpleTest';
import BasicTest from './pages/BasicTest';
import MinimalPage from './pages/MinimalPage';
import SimpleHome from './pages/SimpleHome';

// Import CSS
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/service/:id" element={<ServiceDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/simple" element={<SimpleTest />} />
              <Route path="/basic" element={<BasicTest />} />
              <Route path="/minimal" element={<MinimalPage />} />
              <Route path="/simple-home" element={<SimpleHome />} />

              {/* Protected Routes with Phone Verification */}
              <Route path="/create-job" element={
                <ProtectedRoute requirePhoneVerification={true}>
                  <CreateJob />
                </ProtectedRoute>
              } />

              <Route path="/create-service" element={
                <ProtectedRoute requirePhoneVerification={true}>
                  <CreateService />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute requirePhoneVerification={false}>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* 404 Page */}
              <Route path="*" element={
                <div className="flex items-center justify-center min-h-[70vh]">
                  <div className="text-center max-w-md mx-auto p-8">
                    <div className="mb-8">
                      <div className="inline-flex items-center justify-center p-6 bg-gray-100 rounded-full shadow-sm">
                        <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-8">Oops! We couldn't find the page you're looking for.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => window.history.back()}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2.5 px-5 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Go Back
                      </button>
                      <a
                        href="/"
                        className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        Back to Home
                      </a>
                    </div>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;