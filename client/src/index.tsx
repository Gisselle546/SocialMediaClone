import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from './context/auth';
import './index.css';
import App from './App';



interface ErrorBoundaryProps {
  children: any
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: object;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: new Error(),
      info: { componentStack: "" },
    };
  }

  static getDerivedStateFromError = (error: Error) => {
    return { hasError: true };
  };

  componentDidCatch(error: Error | null, info: object) {
    console.log("error", error);
    this.setState({ hasError: true, error, info });
  }


  render() {
    if (this.state.hasError) {
      return (
        
          <h2>Oops! Something went wrong.</h2>
       
      );
    }
    return this.props.children;
  }
}


const app=(
  <ErrorBoundary>
    
    <AuthProvider>
    <Router>
      <App />
    </Router>
    </AuthProvider>
    
  </ErrorBoundary>
)



ReactDOM.render(
 app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

