import { Component, ErrorInfo, ReactNode } from "react";
import ErrorDisplay from "./ErrorDisplay";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorDisplay error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;