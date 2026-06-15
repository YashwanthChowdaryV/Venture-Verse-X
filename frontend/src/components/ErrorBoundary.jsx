import React, { Component } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-2xl">
            <div className="inline-flex p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full">
              <AlertOctagon className="w-12 h-12" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Something went wrong</h2>
              <p className="text-sm text-slate-400">
                An unexpected UI rendering error occurred. We have logged this issue.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl text-left overflow-x-auto max-h-[120px]">
                <code className="text-xs text-red-400 font-mono">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 bg-indigo-650 hover:bg-indigo-600 rounded-xl font-semibold text-white text-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
