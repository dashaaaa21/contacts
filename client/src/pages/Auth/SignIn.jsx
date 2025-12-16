import { useState } from 'react';

const API_URL = '/api/auth/login';

export default function SignIn({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const rawText = await response.text();

      let data = null;

      if (isJson && rawText) {
        try {
          data = JSON.parse(rawText);
        } catch (parseError) {
          console.error('Failed to parse JSON from signin response', parseError);
        }
      }

      const success = response.ok;

      if (!success) {
        const errorMessage =
          (data && data.message) ||
          rawText ||
          'Login failed';
        setMessage(errorMessage);
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);

      if (onLoginSuccess) {
        onLoginSuccess({
          token: data.token,
          user: data.user,
        });
      }

      setMessage('Login successful!');
    } catch (error) {
      const friendly =
        error?.message
          ? `Server error: ${error.message}`
          : 'Server error. Please try again.';
      setMessage(friendly);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="text-gray-600">Enter your credentials to continue.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-500 text-black font-semibold py-2 rounded-md hover:bg-lime-400 transition disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {message && (
          <div className="text-center text-sm text-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

