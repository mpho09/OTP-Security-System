// client/src/App.jsx
import { useState } from 'react';
import './App.css';

function App() {
  // Navigation & Data tracking states
  const [step, setStep] = useState(1); // step 1 = Email screen, step 2 = OTP screen
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  // Feedback states
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // SCREEN 1 FUNCTION: Submit email to get an OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setStep(2); // Automatically advance to the OTP screen
      } else {
        setIsError(true);
        setMessage(data.message);
      }
    } catch (err) {
      setIsError(true);
      setMessage("Failed to connect to the backend server.");
    }
  };

  // SCREEN 2 FUNCTION: Submit OTP to see if it's correct
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setIsError(true);
        setMessage(data.message);
      }
    } catch (err) {
      setIsError(true);
      setMessage("Failed to connect to the backend server.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: '8px' }}>

      {/* Dynamic Header */}
      <h2>{step === 1 ? "Step 1: Request OTP" : "Step 2: Verify OTP"}</h2>

      {/* Screen 1: Email Input */}
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email Address:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email..."
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Get OTP
          </button>
        </form>
      )}

      {/* Screen 2: OTP Input */}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <p style={{ fontSize: '14px', color: '#555' }}>
            Sent code to: <strong>{email}</strong>
          </p>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Enter 6-digit OTP:</label>
            <input
              type="text"
              maxLength="6"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', letterSpacing: '2px', textAlign: 'center' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>
            Verify OTP
          </button>
          <button type="button" onClick={() => setStep(1)} style={{ width: '100%', padding: '5px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
            Go Back
          </button>
        </form>
      )}

      {/* Shared Feedback Message Box */}
      {message && (
        <div style={{ marginTop: '20px', padding: '10px', borderRadius: '4px', backgroundColor: isError ? '#f8d7da' : '#d4edda', color: isError ? '#721c24' : '#155724', textAlign: 'center' }}>
          {message}
        </div>
      )}

    </div>
  );
}

export default App;

