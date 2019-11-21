import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

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

ErrorBoundary.propTypes = {
  children: PropTypes.element
}

export default ErrorBoundary;