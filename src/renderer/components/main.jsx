import React from 'react';
import SC from 'soundcloud';

export class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            message: 'This is main.jsx',
            trackName: 'default'
        };
        SC.initialize({
            client_id: '964d428beee7b8d4350fc942c594fd7d',
            redirect_uri: 'http://shimpei.ws/sc-fav/callback'
        });
        // TODO: Use API Directory(refs: https://github.com/gillesdemey/Cumulus/blob/master/index.js#L50)
        // SC.connect().then(() => {
        //     return SC.get('/me');
        // }).then(function(me) {
        //     alert('Hello, ' + me.username);
        // });
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
