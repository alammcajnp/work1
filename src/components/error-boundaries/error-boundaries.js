import React, {Component} from 'react';
import './error-boundaries.scss';

class ErrorBoundaries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            didErrorCaught: false,
            showStack: false
        }
    }

    static getDerivedStateFromError(error) {
        return {didErrorCaught: true}
    }

    componentDidCatch(error, errorInfo) {
        //console.log('xxxx componentDidCatch', error, errorInfo)
        const stack = errorInfo.componentStack.split(' in ');
        this.setState({errors: stack})
    }

    render() {
        const {showStack, didErrorCaught, errors} = this.state;
        return (
            <>
                {didErrorCaught ?
                    <div className="error-boundaries">
                        <h2>Error Page, Something has broken</h2>
                        {showStack && <div>{errors.map((error) => {
                            return <p>{error}</p>
                        })}</div>}
                    </div> :
                    this.props.children
                }
            </>
        );
    }
}

export default ErrorBoundaries;
