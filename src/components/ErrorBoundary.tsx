import React from 'react';

interface ErrorBoundaryState { hasError: boolean; error?: any; }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white px-6 text-center">
          <h1 className="text-3xl font-black mb-4">Something went wrong</h1>
          <p className="text-sm text-neutral-400 max-w-md mb-8">An unexpected error occurred. Try refreshing or go back to the homepage.</p>
          <div className="flex gap-4">
            <button onClick={() => window.location.reload()} className="bg-[#FF2B2B] hover:bg-red-600 transition-colors px-6 py-3 rounded-lg font-semibold text-sm">Refresh</button>
            <a href="/" className="border border-neutral-600 hover:border-[#FF2B2B] px-6 py-3 rounded-lg font-semibold text-sm transition-colors">Home</a>
          </div>
          <details className="mt-8 w-full max-w-xl text-left text-xs bg-neutral-900/70 border border-neutral-800 rounded p-4 space-y-2">
            <summary className="cursor-pointer text-neutral-400">Error details</summary>
            <pre className="whitespace-pre-wrap break-all text-neutral-500">{String(this.state.error)}</pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
