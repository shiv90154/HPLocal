import React from 'react';

const MinimalPage = () => {
    return (
        <div>
            <h1>Minimal Test Page</h1>
            <p>This is a minimal test page with no external dependencies.</p>
            <button onClick={() => alert('Button clicked!')}>Click Me</button>
        </div>
    );
};

export default MinimalPage;