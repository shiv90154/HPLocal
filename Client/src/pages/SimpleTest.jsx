import React from 'react';

const SimpleTest = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Simple Test Page</h1>
            <p style={{ marginBottom: '16px' }}>This is a simple test page with inline styles to verify that the application is working correctly.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Card 1</h2>
                    <p>This is a simple card with inline styles.</p>
                </div>

                <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Card 2</h2>
                    <p>This is another simple card with inline styles.</p>
                </div>
            </div>

            <button
                style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Simple Button
            </button>
        </div>
    );
};

export default SimpleTest;