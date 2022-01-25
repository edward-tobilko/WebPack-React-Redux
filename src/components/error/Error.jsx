import React from 'react';


const Error = (props) => {
    return <div>
        <button onClick={() => props.history.push('/')}>Go to main page</button>
        Error page
    </div>;
};


export default Error;
