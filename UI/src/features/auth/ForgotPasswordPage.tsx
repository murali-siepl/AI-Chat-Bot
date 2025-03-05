import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Loader2, Mail, ArrowLeft } from 'lucide-react';
import { resetPassword, clearError } from '../../store/authSlice';
import type { AppDispatch, RootState } from '../../store';

const ForgotPasswordPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, resetEmailSent } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-indigo-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-white">Reset your password</h2>
        <p className="mt-2 text-sm text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {resetEmailSent ? (
        <div className="text-center space-y-4">
          <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded">
            Password reset link has been sent to your email.
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to login
          </button>
        </div>
      ) : (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-400 text-white rounded-lg bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send reset link'}
            </button>
            
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center text-sm text-indigo-400 hover:text-indigo-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;