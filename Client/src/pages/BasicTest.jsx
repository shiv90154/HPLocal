import React from 'react';

const BasicTest = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Basic Test Page</h1>
            <p>This is a very basic test page with minimal styling.</p>
            <button style={{ marginTop: '20px', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>
                Test Button
            </button>
        </div>
    );
};

export default BasicTest;