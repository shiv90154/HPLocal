import React from 'react';

const TestPage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Test Page</h1>
            <p style={{ marginBottom: '20px' }}>This is a simple test page to verify that the application is working correctly.</p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Card 1</h2>
                    <p>This is a test card with inline styles.</p>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Card 2</h2>
                    <p>This is another test card with inline styles.</p>
                </div>
            </div>

            <button style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
            }}>
                Test Button
            </button>
        </div>
    );
};

export default TestPage;