import React from "react";

function AuthLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    }}>
      {children}
    </div>
  )
}

export default AuthLayout;