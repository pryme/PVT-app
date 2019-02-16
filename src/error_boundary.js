import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(error.message);
    //console.log(info);
  }
  
  render() {
    if (this.state.hasError) {
      return <h2>Error</h2>
    }
    return this.props.children;
  }
  
}

export default ErrorBoundary;