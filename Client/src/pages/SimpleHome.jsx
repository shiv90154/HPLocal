import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHome = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
                background: 'linear-gradient(to right, #2563eb, #1e40af)',
                color: 'white',
                padding: '40px 20px',
                borderRadius: '8px',
                marginBottom: '30px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
                    Connecting Himachal Through Jobs & Services
                </h1>
                <p style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto 24px' }}>
                    Find local jobs or services, or offer your skills to the community across Himachal Pradesh.
                </p>

                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    maxWidth: '800px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}>
                    <input
                        type="text"
                        placeholder="Search jobs or services..."
                        style={{
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '100%'
                        }}
                    />

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
                        <select style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                            <option value="">All Locations</option>
                            <option value="Shimla">Shimla</option>
                            <option value="Manali">Manali</option>
                            <option value="Dharamshala">Dharamshala</option>
                        </select>

                        <select style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                            <option value="">All Categories</option>
                            <option value="IT">IT</option>
                            <option value="Hospitality">Hospitality</option>
                            <option value="Tourism">Tourism</option>
                        </select>

                        <button style={{
                            backgroundColor: '#2563eb',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Latest Jobs</h2>
                    <Link to="/jobs" style={{ color: '#2563eb', fontWeight: '500' }}>View All Jobs →</Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                }}>
                    {[1, 2, 3].map(job => (
                        <div key={job} style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            border: '1px solid #eee'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <span style={{
                                        display: 'inline-block',
                                        backgroundColor: '#f3f4f6',
                                        padding: '2px 8px',
                                        borderRadius: '9999px',
                                        fontSize: '12px',
                                        marginBottom: '8px'
                                    }}>
                                        IT
                                    </span>
                                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Software Developer</h3>
                                    <p style={{ color: '#4b5563', marginBottom: '8px' }}>Tech Solutions</p>
                                </div>
                                <div style={{
                                    backgroundColor: '#dbeafe',
                                    color: '#2563eb',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '9999px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span>J</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '14px', marginTop: '16px' }}>
                                <span>Shimla</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '16px',
                                fontSize: '14px'
                            }}>
                                <span style={{ color: '#6b7280' }}>July 10, 2025</span>
                                <Link to={`/job/${job}`} style={{ color: '#2563eb', fontWeight: '500' }}>
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '40px', backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Latest Services</h2>
                    <Link to="/services" style={{ color: '#2563eb', fontWeight: '500' }}>View All Services →</Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                }}>
                    {[1, 2, 3].map(service => (
                        <div key={service} style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            border: '1px solid #eee'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <span style={{
                                        display: 'inline-block',
                                        backgroundColor: '#f3f4f6',
                                        padding: '2px 8px',
                                        borderRadius: '9999px',
                                        fontSize: '12px',
                                        marginBottom: '8px'
                                    }}>
                                        Plumbing
                                    </span>
                                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Plumbing Services</h3>
                                    <p style={{ color: '#4b5563', marginBottom: '8px' }}>Raj Plumbers</p>
                                </div>
                                <div style={{
                                    backgroundColor: '#dcfce7',
                                    color: '#16a34a',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '9999px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span>S</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '14px', marginTop: '16px' }}>
                                <span>Shimla</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '16px',
                                fontSize: '14px'
                            }}>
                                <span style={{ color: '#6b7280' }}>July 8, 2025</span>
                                <Link to={`/service/${service}`} style={{ color: '#2563eb', fontWeight: '500' }}>
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SimpleHome;