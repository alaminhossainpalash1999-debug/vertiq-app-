import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'signup') {
      if (username.trim().length < 3) {
        setError('Username must be at least 3 characters.');
        setLoading(false);
        return;
      }
      const signupEmail = authMethod === 'phone' ? `${phone}@phone.vertiq.app` : email;
      const phoneValue = authMethod === 'phone' ? (phone.startsWith('+') ? phone : `+${phone}`) : undefined;
      const { error } = await signUp(signupEmail, password, username.trim(), phoneValue);
      if (error) setError(error);
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error);
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 relative">
      <div className="w-full max-w-[360px] flex flex-col items-center pt-16">
        {/* Logo */}
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8A2BE2] to-[#FF69B4] shadow-lg shadow-[#8A2BE2]/20 mb-6">
          <span className="text-4xl font-black text-white">V</span>
        </div>

        <h1 className="text-[28px] font-bold text-black text-center">Join Vertiq ✨</h1>
        <p className="text-[15px] text-gray-500 text-center mt-2 mb-10">Create your profile, go live and chat</p>

        {/* Login mode */}
        {mode === 'login' && (
          <form onSubmit={handleSubmit} className="w-full space-y-3 mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-black placeholder-gray-400 focus:outline-none focus:border-[#8A2BE2] transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-black placeholder-gray-400 focus:outline-none focus:border-[#8A2BE2] transition-colors"
              required
              minLength={6}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8A2BE2] text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {loading ? 'Please wait…' : 'Log In'}
            </button>
          </form>
        )}

        {/* Signup mode */}
        {mode === 'signup' && (
          <>
            {/* Method toggle */}
            <div className="flex gap-2 mb-4 w-full">
              <button
                type="button"
                onClick={() => { setAuthMethod('phone'); setError(null); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  authMethod === 'phone' ? 'bg-[#8A2BE2] text-white' : 'bg-white border border-[#E5E7EB] text-gray-600'
                }`}
              >
                Phone
              </button>
              <button
                type="button"
                onClick={() => { setAuthMethod('email'); setError(null); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  authMethod === 'email' ? 'bg-[#8A2BE2] text-white' : 'bg-white border border-[#E5E7EB] text-gray-600'
                }`}
              >
                Email
              </button>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-3 mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-black placeholder-gray-400 focus:outline-none focus:border-[#8A2BE2] transition-colors"
                required
                minLength={3}
              />
              {authMethod === 'phone' ? (
                <input
                  type="tel"
                  placeholder="+966 5xx xxx xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-black placeholder-gray-400 focus:outline-none focus:border-[#8A2BE2] transition-colors"
                  required
                />
              ) : (
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-black placeholder-gray-400 focus:outline-none focus:border-[#8A2BE2] transition-colors"
                  required
                />
              )}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 text-black placeholder-gray-400 focus:outline-none focus:border-[#8A2BE2] transition-colors"
                required
                minLength={6}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8A2BE2] text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {loading ? 'Please wait…' : 'Sign Up'}
              </button>
            </form>
          </>
        )}

        {/* Divider */}
        {mode === 'signup' && (
          <div className="flex items-center gap-3 w-full my-3">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>
        )}

        {/* Buttons */}
        <div className="w-full space-y-3.5">
          {mode === 'signup' && (
            <button
              onClick={() => { setAuthMethod('phone'); setError(null); }}
              className="w-full flex items-center justify-center gap-3 bg-white border border-[#E5E7EB] rounded-xl py-3.5 h-[54px] font-semibold text-black text-sm hover:bg-gray-50 transition-colors active:scale-[0.98]"
            >
              <Phone className="w-5 h-5 text-[#8A2BE2]" />
              Use phone or email
            </button>
          )}

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-[#E5E7EB] rounded-xl py-3.5 h-[54px] font-semibold text-black text-sm hover:bg-gray-50 transition-colors active:scale-[0.98]"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>

        {/* Terms */}
        <p className="text-[11px] text-gray-500 text-center mt-6 leading-relaxed">
          By continuing from Saudi Arabia, you agree to our{' '}
          <span className="text-[#8A2BE2] font-medium">Terms of Service</span> and{' '}
          <span className="text-[#8A2BE2] font-medium">Privacy Policy</span>.
        </p>

        {/* Footer */}
        <div className="w-full mt-6">
          <div className="h-px bg-[#E5E7EB] mb-4" />
          <p className="text-center text-sm text-gray-500">
            {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(null); }}
              className="text-[#8A2BE2] font-bold"
            >
              {mode === 'signup' ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
