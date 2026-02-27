import { Component, ErrorInfo, ReactNode } from "react";
import InfernalServerErrorPage from "@/pages/500";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    this.setState({ hasError: true });

    /*
    if (window.Sentry) {
      window.Sentry.configureScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });
      });
      window.Sentry.captureException(error);
    }
    */
  }

  render() {
    if (this.state.hasError) {
      // render fallback UI
      return <InfernalServerErrorPage />;
    } else {
      // when there's not an error, render children untouched
      return this.props.children;
    }
  }
}
