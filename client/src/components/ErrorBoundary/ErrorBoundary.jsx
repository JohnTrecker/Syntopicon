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
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary--content">
          <p>We&apos;re sorry — something&apos;s gone wrong.</p>
          <p>Our team has been notified.</p>
          <DelayedRedirect delay={3000}/>
        </div>
      )
    }

    return this.props.children;
  }
}

function DelayedRedirect({delay}){
  return setTimeout(() => (
    <Redirect to={{pathname: "/topics"}}/>
  ), delay);
}

ErrorBoundary.propTypes = {
  children: PropTypes.element
}

export default ErrorBoundary;