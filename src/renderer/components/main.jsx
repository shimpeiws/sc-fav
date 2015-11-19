import React from 'react';

export class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            message: 'This is main.jsx',
            trackName: 'default'
        };
    }
    
    render() {
        return(
            <div className="container">
                <h1>{this.state.message}</h1>
                <p>{this.state.trackName}</p>
            </div>
        );
    }
}
