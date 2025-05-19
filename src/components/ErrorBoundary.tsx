'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅
    console.error('Uncaught error:', error);
    console.error('Error info:', errorInfo);

    // 여기에 에러 로깅 서비스 연동 가능
    // 예: Sentry.captureException(error);

    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    console.log(this.state.hasError);
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">오류가 발생했습니다</h2>
              <p className="text-gray-600 mb-4">{this.state.error?.message || '알 수 없는 오류가 발생했습니다.'}</p>
              {this.state.errorInfo && (
                <div className="text-sm text-gray-500 mb-6">
                  <p>오류 상세 정보:</p>
                  <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
              <Button onClick={this.handleReset} className="w-full py-3 text-lg">
                다시 시도
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
