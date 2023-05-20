import { Component } from "react";
import InfernalServerErrorPage from "../pages/500";

export default class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });

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
    if (this.state.error) {
      // render fallback UI
      return <InfernalServerErrorPage />;
    } else {
      // when there's not an error, render children untouched
      return this.props.children;
    }
  }
}
