import React from 'react';
import ReactDom from 'react-dom';
import {Main} from './components/main';
import electron from 'electron';
import SoundCloud from 'soundcloud';

electron.ipcRenderer.on('token', (event, arg) => {
    event.sender.send('token', 'success');  // 送信元へレスポンスを返す
    SoundCloud.initialize({
        client_id: '964d428beee7b8d4350fc942c594fd7d',
        oauth_token: arg
    });

    ReactDom.render(
        React.createElement(
          Main,{sc: SoundCloud}
        ),
        document.getElementById('app')
    );
});
