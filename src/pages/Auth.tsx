import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from || '/order/summary';

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'signup') {
        if (!form.name || !form.email || !form.phone || !form.password) throw new Error('All fields required');
        await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      } else {
        if (!form.email || !form.password) throw new Error('Email & password required');
        await login(form.email, form.password);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between mb-6">
          <button onClick={() => setMode('signup')} className={`text-sm font-semibold px-3 py-2 rounded-md ${mode==='signup'?'bg-[#FF2B2B] text-white':'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-800'}`}>Sign Up</button>
          <button onClick={() => setMode('login')} className={`text-sm font-semibold px-3 py-2 rounded-md ${mode==='login'?'bg-[#FF2B2B] text-white':'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-800'}`}>Log In</button>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">{mode==='signup'?'Create Account':'Welcome Back'}</h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">Access your website order dashboard</p>
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 px-3 py-2 rounded">{error}</div>}
        <form onSubmit={submit} className="space-y-4">
          {mode==='signup' && (
            <input name="name" value={form.name} onChange={change} placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B]" />
          )}
          <input name="email" type="email" value={form.email} onChange={change} placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B]" />
          {mode==='signup' && (
            <input name="phone" value={form.phone} onChange={change} placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B]" />
          )}
          <input name="password" type="password" value={form.password} onChange={change} placeholder="Password" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-[#FF2B2B]" />
          <button disabled={loading} className="w-full bg-[#FF2B2B] text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm">{loading? 'Please wait...': mode==='signup'?'Create Account':'Log In'}</button>
        </form>
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">By continuing you agree to our pay-after-delivery model terms.</p>
      </div>
    </div>
  );
}
