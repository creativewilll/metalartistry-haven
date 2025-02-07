import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 404 Page Component
 * Automatically redirects to home page after mounting
 */
export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page immediately
    navigate('/', { replace: true });
  }, [navigate]);

  // This won't be visible since we redirect immediately,
  // but it's good practice to return something
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Redirecting to home...</h1>
    </div>
  );
}
