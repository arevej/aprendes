import React from 'react';

function Container({ children }) {
  return (
    <div
      style={{
        marginTop: '100px',
        marginLeft: '150px',
        marginRight: '150px',
        marginBottom: '30px',
        flex: '1',
      }}
    >
      {children}
    </div>
  );
}

export default Container;
