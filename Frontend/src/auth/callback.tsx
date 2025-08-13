import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [status, setStatus] = useState('Processing authentication...');
  const [debugInfo, setDebugInfo] = useState([]);

  const addDebug = (message) => {
    console.log('🔍 AuthCallback:', message);
    setDebugInfo(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  useEffect(() => {
    addDebug('AuthCallback component mounted');
    addDebug(`Current URL: ${window.location.href}`);
    addDebug(`Search params: ${location.search}`);

    // Get token and error from URL
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    addDebug(`Token found: ${!!token}`);
    addDebug(`Error found: ${!!error}`);

    if (error) {
      addDebug(`Authentication error: ${error}`);
      setStatus(`Authentication failed: ${error}`);
      setTimeout(() => {
        navigate('/login?error=' + error);
      }, 2000);
      return;
    }

    if (!token) {
      addDebug('No token found in URL parameters');
      setStatus('No authentication token received');
      setTimeout(() => {
        navigate('/login?error=no_token');
      }, 2000);
      return;
    }

    addDebug(`Token length: ${token.length}`);
    addDebug(`Token preview: ${token.substring(0, 50)}...`);

    try {
      // Decode the JWT token to verify it's valid
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      addDebug(`Token payload: ${JSON.stringify(payload, null, 2)}`);

      // Check if token is expired
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        addDebug('Token is expired');
        setStatus('Authentication token has expired');
        setTimeout(() => {
          navigate('/login?error=token_expired');
        }, 2000);
        return;
      }

      addDebug('Token is valid, saving to localStorage');
      
      // Clear any existing auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Save the new token
      localStorage.setItem('token', token);
      
      // Verify the token was saved
      const savedToken = localStorage.getItem('token');
      addDebug(`Token saved successfully: ${!!savedToken}`);
      addDebug(`Saved token length: ${savedToken ? savedToken.length : 0}`);

      if (savedToken && savedToken === token) {
        addDebug('Token saved successfully, redirecting to home');
        setStatus('Authentication successful! Redirecting...');
        
        // Small delay to ensure everything is saved
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      } else {
        addDebug('Failed to save token to localStorage');
        setStatus('Failed to save authentication data');
        setTimeout(() => {
          navigate('/login?error=save_failed');
        }, 2000);
      }

    } catch (error) {
      addDebug(`Error processing token: ${error.message}`);
      setStatus(`Error processing authentication: ${error.message}`);
      setTimeout(() => {
        navigate('/login?error=invalid_token');
      }, 2000);
    }
  }, [navigate, searchParams, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-2xl w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Authentication</h2>
        <p className="text-foreground mb-6">{status}</p>
        
        {/* Debug information - remove in production */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-left max-h-64 overflow-y-auto">
          <h3 className="font-bold mb-2 text-sm">Debug Log:</h3>
          {debugInfo.map((info, index) => (
            <div key={index} className="text-xs mb-1 font-mono break-words">
              {info}
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
          <p>Current URL: {window.location.href}</p>
          <p>LocalStorage test: {(() => {
            try {
              localStorage.setItem('test', 'working');
              const result = localStorage.getItem('test');
              localStorage.removeItem('test');
              return result === 'working' ? 'Working' : 'Failed';
            } catch (e) {
              return `Error: ${e.message}`;
            }
          })()}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;