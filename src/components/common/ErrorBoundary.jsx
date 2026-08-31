import React from 'react';
import Button from '../primitives/Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1B2A47] flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-6 bg-white p-8 border border-[#EAE6DF] rounded-[2px] shadow-subtle">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] block">
              Atelier Vauquelin
            </span>
            <h1 className="font-editorial text-3xl text-[#1B2A47] font-normal">
              Something went unexpected.
            </h1>
            <p className="text-xs sm:text-sm text-[#5F6470] font-light leading-relaxed">
              We encountered a temporary rendering issue. Please reload the page or return to the main monograph.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button onClick={this.handleReload} variant="primary" size="sm">
                Reload Monograph
              </Button>
              <Button to="/" variant="outline" size="sm">
                Return Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
