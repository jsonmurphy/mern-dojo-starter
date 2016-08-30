import React from 'react';
import { connect } from 'react-redux';

// Import Components

class App extends React.Component {
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
    };
}

export default connect(mapStateToProps)(App);
