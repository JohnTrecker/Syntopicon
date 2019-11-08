import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(error) {
  //   return { hasError: true };
  // }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true })
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary--content">
          <p>We&apos;re sorry — something&apos;s gone wrong.</p>
          <p>Our team has been notified.</p>
          {/* <Redirect to={{pathname: "/topics"}}/>; */}
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;